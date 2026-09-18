import { ObjectId } from 'mongodb';
import { getInvitationsCollection, getMediaCollection } from '$lib/server/db';
import { deleteMediaByPublicId } from '$lib/server/cloudinary';
import type { InvitationContent } from '$lib/types/invitation';

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
