import { json, error, type RequestHandler } from '@sveltejs/kit';
import { getInvitationById } from '$lib/server/invitations';
import { uploadMediaBuffer, deleteMediaByPublicId } from '$lib/server/cloudinary';
import { getMediaCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import { detectImageMimeType } from '$lib/server/media';
import path from 'node:path';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, 'AUTH_REQUIRED');
	}

	const formData = await request.formData();
	const file = formData.get('file');
	const invitationId = formData.get('invitationId')?.toString();

	if (!invitationId) throw error(400, 'INVITATION_ID_REQUIRED');
	const invitation = await getInvitationById(invitationId);
	if (!invitation || invitation.userId !== locals.user.id) throw error(403, 'FORBIDDEN');

	if (!file || !(file instanceof File)) {
		throw error(400, 'NO_FILE_PROVIDED');
	}

	if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
		throw error(400, 'UNSUPPORTED_FILE_TYPE');
	}

	if (file.size > MAX_IMAGE_BYTES) {
		throw error(400, 'FILE_TOO_LARGE');
	}

	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const verifiedMime = detectImageMimeType(buffer);
		if (!verifiedMime || !ALLOWED_IMAGE_TYPES.includes(verifiedMime)) {
			throw error(400, 'INVALID_IMAGE_CONTENT');
		}

		const safeOriginalName = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);

		const result = await uploadMediaBuffer(buffer, {
			folder: `invitation/${locals.user.id}`,
			filename: safeOriginalName,
			mimeType: verifiedMime,
			resourceType: 'image'
		});

		const mediaCol = await getMediaCollection();
		const now = new Date();

		let userObjId;
		try {
			userObjId = new ObjectId(locals.user.id);
		} catch {
			userObjId = locals.user.id;
		}

		const doc = {
			userId: userObjId,
			invitationId: invitationId || null,
			type: 'image',
			cloudinary: {
				publicId: result.publicId,
				secureUrl: result.secureUrl,
				resourceType: result.resourceType
			},
			originalName: safeOriginalName,
			mimeType: verifiedMime,
			width: result.width || 1200,
			height: result.height || 800,
			bytes: result.bytes,
			createdAt: now
		};

		let insertResult;
		try {
			insertResult = await mediaCol.insertOne(doc);
		} catch (err) {
			await deleteMediaByPublicId(result.publicId, result.resourceType).catch(() =>
				console.error('Upload rollback failed')
			);
			throw err;
		}

		return json({
			success: true,
			media: {
				id: insertResult.insertedId.toString(),
				url: result.secureUrl,
				publicId: result.publicId,
				width: result.width,
				height: result.height
			}
		});
	} catch (err) {
		console.error('Upload media error:', err);
		throw error(500, 'MEDIA_UPLOAD_FAILED');
	}
};
