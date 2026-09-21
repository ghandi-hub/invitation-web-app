import {
	getInvitationsCollection,
	getMediaCollection,
	getRsvpsCollection,
	getGuestbookCollection
} from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { Invitation, InvitationContent, InvitationTheme, WeddingEvent } from '$lib/types/invitation';
import { imageIds, deleteUnusedImage } from '$lib/server/media';
import { deleteMediaByPublicId } from '$lib/server/cloudinary';

export function createDefaultContent(): InvitationContent {
	return {
		opening: { greeting: '', quote: '', quoteSource: '' },
		couple: {
			partner1: { name: '', fullName: '', childOf: '', photoMediaId: null, photoUrl: null },
			partner2: { name: '', fullName: '', childOf: '', photoMediaId: null, photoUrl: null }
		},
		hero: { headline: '', subheadline: '', coverMediaId: null, coverUrl: null, dateBadge: '' },
		story: { title: '', body: '' },
		events: [],
		countdown: { targetDate: '' },
		gallery: [],
		rsvp: { enabled: false, deadline: '', allowGuestCount: true },
		guestbook: { enabled: false },
		gift: { enabled: false, items: [] }
	};
}

export function sanitizeSlug(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9-]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 60);
}

export function sanitizeExternalUrl(url: unknown): string | null {
	if (typeof url !== 'string') return null;
	const trimmed = url.trim();
	if (!trimmed) return null;
	try {
		const parsed = new URL(trimmed);
		if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
			return parsed.href;
		}
		return null;
	} catch {
		return null;
	}
}

export function sanitizeContentEvents(content: InvitationContent): InvitationContent {
	if (!content || typeof content !== 'object') return content;
	if (!Array.isArray(content.events)) return content;
	return {
		...content,
		events: content.events.map((evt: WeddingEvent) => ({
			...evt,
			mapsUrl: sanitizeExternalUrl(evt?.mapsUrl)
		}))
	};
}

export async function isSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
	const col = await getInvitationsCollection();
	const clean = sanitizeSlug(slug);
	if (!clean) return false;

	const filter: Record<string, unknown> = { slug: clean };
	if (excludeId) {
		try {
			filter._id = { $ne: new ObjectId(excludeId) };
		} catch {
			filter._id = { $ne: excludeId };
		}
	}

	const existing = await col.findOne(filter);
	return !existing;
}

export async function generateUniqueSlug(
	p1: string,
	p2: string,
	currentId?: string
): Promise<string> {
	const base = sanitizeSlug(`${p1}-${p2}`) || 'wedding-invitation';
	let slug = base;
	let counter = 1;

	while (!(await isSlugAvailable(slug, currentId))) {
		slug = `${base}-${counter}`;
		counter++;
	}

	return slug;
}

function mapDocToInvitation(doc: any): Invitation {
	return {
		id: doc._id.toString(),
		userId: doc.userId.toString(),
		eventType: doc.eventType || 'wedding',
		slug: doc.slug,
		status: doc.status || 'draft',
		theme: doc.theme || 'editorial',
		content: sanitizeContentEvents(doc.content || createDefaultContent()),
		music: doc.music,
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt,
		publishedAt: doc.publishedAt || null
	};
}

export async function createDefaultInvitation(userId: string): Promise<Invitation> {
	const col = await getInvitationsCollection();
	const now = new Date();
	const defaultContent = createDefaultContent();
	const slug = await generateUniqueSlug(
		defaultContent.couple.partner1.name,
		defaultContent.couple.partner2.name
	);

	let userObjId: ObjectId | string;
	try {
		userObjId = new ObjectId(userId);
	} catch {
		userObjId = userId;
	}

	const doc = {
		userId: userObjId,
		eventType: 'wedding',
		slug,
		status: 'draft',
		theme: 'editorial' as InvitationTheme,
		content: defaultContent,
		music: {
			type: 'library' as const,
			musicId: '6aad52aefbd641276ebe81c1',
			url: 'https://res.cloudinary.com/diton4fcf/video/upload/v1789742766/Payung-Teduh-Akad-Official-Music_tqdhnl.mp3',
			title: 'Payung Teduh - Akad'
		},
		createdAt: now,
		updatedAt: now,
		publishedAt: null
	};

	const result = await col.insertOne(doc);
	return {
		...mapDocToInvitation(doc),
		id: result.insertedId.toString()
	};
}

export async function getInvitationById(id: string): Promise<Invitation | null> {
	try {
		const col = await getInvitationsCollection();
		let filter;
		try {
			filter = { _id: new ObjectId(id) };
		} catch {
			filter = { _id: id as unknown as ObjectId };
		}
		const doc = await col.findOne(filter);
		if (!doc) return null;
		return mapDocToInvitation(doc);
	} catch {
		return null;
	}
}

export async function getInvitationBySlug(slug: string): Promise<Invitation | null> {
	try {
		const col = await getInvitationsCollection();
		const doc = await col.findOne({ slug: sanitizeSlug(slug) });
		if (!doc) return null;
		return mapDocToInvitation(doc);
	} catch {
		return null;
	}
}

export async function getUserInvitations(userId: string): Promise<Invitation[]> {
	try {
		const col = await getInvitationsCollection();
		let userFilter;
		try {
			userFilter = { $in: [new ObjectId(userId), userId] };
		} catch {
			userFilter = userId;
		}

		const docs = await col.find({ userId: userFilter }).sort({ updatedAt: -1 }).toArray();

		return docs.map(mapDocToInvitation);
	} catch {
		return [];
	}
}

export async function updateInvitation(
	id: string,
	userId: string,
	updates: Partial<Invitation>,
	removedMediaIds: string[] = []
): Promise<Invitation> {
	const current = await getInvitationById(id);
	if (!current) {
		throw new Error('INVITATION_NOT_FOUND');
	}

	if (current.userId !== userId) {
		throw new Error('FORBIDDEN');
	}

	const col = await getInvitationsCollection();
	const setFields: Record<string, unknown> = {
		updatedAt: new Date()
	};

	if (updates.slug && updates.slug !== current.slug) {
		const cleanSlug = sanitizeSlug(updates.slug);
		if (!cleanSlug) {
			throw new Error('INVALID_SLUG');
		}
		const available = await isSlugAvailable(cleanSlug, id);
		if (!available) {
			throw new Error('SLUG_ALREADY_EXISTS');
		}
		setFields.slug = cleanSlug;
	}

	if (updates.theme) {
		setFields.theme = updates.theme;
	}

	if (updates.content) {
		setFields.content = sanitizeContentEvents(updates.content);
	}

	if (updates.music !== undefined) {
		setFields.music = updates.music;
	}

	if (updates.status) {
		setFields.status = updates.status;
		if (updates.status === 'published' && !current.publishedAt) {
			setFields.publishedAt = new Date();
		}
	}

	let filter;
	try {
		filter = { _id: new ObjectId(id) };
	} catch {
		filter = { _id: id as unknown as ObjectId };
	}

	const nextIds = new Set(imageIds(updates.content || current.content));
	const removed = [
		...new Set([...imageIds(current.content).filter((id) => !nextIds.has(id)), ...removedMediaIds])
	];
	// Persist retries together with the content change, before deleting any files.
	const previous = await col.findOne(filter);
	const pending = [...new Set([...(previous?.pendingMediaDeletionIds || []), ...removed])];
	await col.updateOne(filter, { $set: { ...setFields, pendingMediaDeletionIds: pending } });
	let cleanupFailed = false;
	for (const mediaId of pending) {
		try {
			await deleteUnusedImage(mediaId, userId, id);
			await col.updateOne(filter, { $pull: { pendingMediaDeletionIds: mediaId } } as any);
		} catch {
			cleanupFailed = true;
		}
	}
	if (cleanupFailed) throw new Error('MEDIA_CLEANUP_FAILED');
	const updated = await getInvitationById(id);
	if (!updated) {
		throw new Error('FAILED_TO_UPDATE');
	}

	return updated;
}

export async function deleteInvitation(id: string, userId: string): Promise<boolean> {
	const current = await getInvitationById(id);
	if (!current) {
		throw new Error('INVITATION_NOT_FOUND');
	}

	if (current.userId !== userId) {
		throw new Error('FORBIDDEN');
	}

	const col = await getInvitationsCollection();
	let filter;
	try {
		filter = { _id: new ObjectId(id) };
	} catch {
		filter = { _id: id as unknown as ObjectId };
	}

	await col.deleteOne(filter);

	// Cascade delete RSVP, guestbook, media records
	try {
		const rsvps = await getRsvpsCollection();
		const guestbook = await getGuestbookCollection();
		const media = await getMediaCollection();

		await rsvps.deleteMany({ invitationId: id });
		await guestbook.deleteMany({ invitationId: id });

		const mediaList = await media.find({ invitationId: id }).toArray();
		for (const m of mediaList) {
			if (m.cloudinary?.publicId) {
				await deleteMediaByPublicId(m.cloudinary.publicId, m.type);
			}
		}
		await media.deleteMany({ invitationId: id });
	} catch (err) {
		console.warn('Cascade delete error:', err);
	}

	return true;
}
