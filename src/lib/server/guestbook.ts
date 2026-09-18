import { getGuestbookCollection } from '$lib/server/db';
import type { GuestbookItem } from '$lib/types/invitation';

export async function createGuestbookEntry(params: {
	invitationId: string;
	name: string;
	message: string;
}): Promise<GuestbookItem> {
	const cleanName = (params.name || '').trim().slice(0, 100);
	if (!cleanName) {
		throw new Error('NAME_REQUIRED');
	}

	const cleanMessage = (params.message || '').trim().slice(0, 1000);
	if (!cleanMessage) {
		throw new Error('MESSAGE_REQUIRED');
	}

	const now = new Date();
	const col = await getGuestbookCollection();

	const doc = {
		invitationId: params.invitationId,
		name: cleanName,
		message: cleanMessage,
		createdAt: now
	};

	const result = await col.insertOne(doc);

	return {
		id: result.insertedId.toString(),
		invitationId: params.invitationId,
		name: cleanName,
		message: cleanMessage,
		createdAt: now
	};
}

export async function getGuestbookEntries(invitationId: string, limit = 50): Promise<GuestbookItem[]> {
	try {
		const col = await getGuestbookCollection();
		const docs = await col
			.find({ invitationId })
			.sort({ createdAt: -1 })
			.limit(limit)
			.toArray();

		return docs.map((d) => ({
			id: d._id.toString(),
			invitationId: d.invitationId,
			name: d.name,
			message: d.message,
			createdAt: d.createdAt
		}));
	} catch {
		return [];
	}
}
