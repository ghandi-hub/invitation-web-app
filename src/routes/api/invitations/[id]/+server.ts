import { json, error, type RequestHandler } from '@sveltejs/kit';
import { getInvitationById, updateInvitation, deleteInvitation } from '$lib/server/invitations';

export const PUT: RequestHandler = async ({ params, locals, request }) => {
	if (!locals.user) {
		throw error(401, 'AUTH_REQUIRED');
	}

	const id = params.id;
	if (!id) {
		throw error(400, 'ID_REQUIRED');
	}

	const current = await getInvitationById(id);
	if (!current) {
		throw error(404, 'INVITATION_NOT_FOUND');
	}

	if (current.userId !== locals.user.id) {
		throw error(403, 'FORBIDDEN');
	}

	const body = await request.json();
	if (!body || typeof body !== 'object') throw error(400, 'INVALID_INPUT');
	const removedMediaIds = body.removedMediaIds ?? [];
	if (
		!Array.isArray(removedMediaIds) ||
		removedMediaIds.length > 200 ||
		removedMediaIds.some((id: unknown) => typeof id !== 'string' || !/^[a-f0-9]{24}$/i.test(id))
	) {
		throw error(400, 'INVALID_MEDIA_IDS');
	}

	try {
		const updated = await updateInvitation(id, locals.user.id, body, removedMediaIds);
		return json({ success: true, invitation: updated });
	} catch (err: any) {
		if (err.message === 'MEDIA_CLEANUP_FAILED') {
			throw error(
				502,
				'Perubahan tersimpan, tetapi foto lama belum berhasil dihapus. Klik Simpan lagi untuk mencoba ulang.'
			);
		}
		if (err.message === 'SLUG_ALREADY_EXISTS') {
			throw error(409, 'SLUG_ALREADY_EXISTS');
		}
		if (err.message === 'INVALID_SLUG') {
			throw error(400, 'INVALID_SLUG');
		}
		console.error('Update invitation error:', err);
		throw error(500, 'FAILED_TO_UPDATE');
	}
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) {
		throw error(401, 'AUTH_REQUIRED');
	}

	const id = params.id;
	if (!id) {
		throw error(400, 'ID_REQUIRED');
	}

	const current = await getInvitationById(id);
	if (!current) {
		throw error(404, 'INVITATION_NOT_FOUND');
	}

	if (current.userId !== locals.user.id) {
		throw error(403, 'FORBIDDEN');
	}

	try {
		await deleteInvitation(id, locals.user.id);
		return json({ success: true });
	} catch (err) {
		console.error('Delete invitation error:', err);
		throw error(500, 'FAILED_TO_DELETE');
	}
};
