import { json, error, type RequestHandler } from '@sveltejs/kit';
import { getInvitationById, updateInvitation } from '$lib/server/invitations';

export const POST: RequestHandler = async ({ params, locals, request }) => {
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

	const body = await request.json().catch(() => ({}));
	const nextStatus = body.status || (current.status === 'published' ? 'unpublished' : 'published');

	try {
		const updated = await updateInvitation(id, locals.user.id, {
			status: nextStatus
		});
		return json({ success: true, invitation: updated });
	} catch (err) {
		console.error('Publish toggle error:', err);
		throw error(500, 'PUBLISH_FAILED');
	}
};
