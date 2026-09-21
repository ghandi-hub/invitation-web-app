import { ObjectId } from 'mongodb';
import { getInvitationsCollection, getMediaCollection } from '$lib/server/db';
import { deleteMediaByPublicId } from '$lib/server/cloudinary';
import type { InvitationContent } from '$lib/types/invitation';

export type AllowedImageMime = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif' | 'image/gif';

export function detectImageMimeType(buffer: Buffer): AllowedImageMime | null {
	if (buffer.length < 12) return null;

	// JPEG: FF D8 FF
	if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
		return 'image/jpeg';
	}

	// PNG: 89 50 4E 47 0D 0A 1A 0A
	if (
		buffer[0] === 0x89 &&
		buffer[1] === 0x50 &&
		buffer[2] === 0x4e &&
		buffer[3] === 0x47 &&
		buffer[4] === 0x0d &&
		buffer[5] === 0x0a &&
		buffer[6] === 0x1a &&
		buffer[7] === 0x0a
	) {
		return 'image/png';
	}

	// GIF: GIF87a or GIF89a
	if (
		buffer[0] === 0x47 &&
		buffer[1] === 0x49 &&
		buffer[2] === 0x46 &&
		buffer[3] === 0x38 &&
		(buffer[4] === 0x37 || buffer[4] === 0x39) &&
		buffer[5] === 0x61
	) {
		return 'image/gif';
	}

	// WebP: RIFF....WEBP
	if (
		buffer[0] === 0x52 &&
		buffer[1] === 0x49 &&
		buffer[2] === 0x46 &&
		buffer[3] === 0x46 &&
		buffer[8] === 0x57 &&
		buffer[9] === 0x45 &&
		buffer[10] === 0x42 &&
		buffer[11] === 0x50
	) {
		return 'image/webp';
	}

	// AVIF: ....ftypavif / ftypavis / ftypMA1B
	const ftyp = buffer.subarray(4, 12).toString('latin1');
	if (ftyp === 'ftypavif' || ftyp === 'ftypavis' || ftyp === 'ftypmif1') {
		return 'image/avif';
	}

	return null;
}

export function imageIds(content: InvitationContent): string[] {
	return [
		...new Set(
			[
				content.couple?.partner1?.photoMediaId,
				content.couple?.partner2?.photoMediaId,
				content.hero?.coverMediaId,
				...(content.gallery || []).map((item) => item.mediaId)
			].filter((id): id is string => typeof id === 'string' && ObjectId.isValid(id))
		)
	];
}

// Read the public ID from owned metadata, never from the request body.
export async function deleteUnusedImage(
	id: string,
	userId: string,
	invitationId: string
): Promise<void> {
	if (!ObjectId.isValid(id)) return;
	const media = await getMediaCollection();
	const doc = await media.findOne({ _id: new ObjectId(id) });
	if (!doc) return; // A repeated cleanup is safe.
	if (doc.userId?.toString() !== userId || doc.type !== 'image') return;
	if (doc.invitationId && doc.invitationId.toString() !== invitationId) return;
	const invitations = await getInvitationsCollection();
	const reference = await invitations.findOne({
		$or: [
			{ 'content.couple.partner1.photoMediaId': id },
			{ 'content.couple.partner2.photoMediaId': id },
			{ 'content.hero.coverMediaId': id },
			{ 'content.gallery.mediaId': id },
			{ 'content.couple.partner1.photoUrl': doc.cloudinary.secureUrl },
			{ 'content.couple.partner2.photoUrl': doc.cloudinary.secureUrl },
			{ 'content.hero.coverUrl': doc.cloudinary.secureUrl },
			{ 'content.gallery.url': doc.cloudinary.secureUrl }
		]
	});
	if (reference) return;
	await deleteMediaByPublicId(doc.cloudinary.publicId, doc.cloudinary.resourceType || 'image');
	await media.deleteOne({ _id: doc._id, userId: doc.userId });
}
