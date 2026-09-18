import { json, error, type RequestHandler } from '@sveltejs/kit';
import { createGuestbookEntry } from '$lib/server/guestbook';
import { getInvitationById } from '$lib/server/invitations';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body || !body.invitationId || !body.name || !body.message) {
		throw error(400, 'MISSING_REQUIRED_FIELDS');
	}

	const invitation = await getInvitationById(body.invitationId);
	if (!invitation) {
		throw error(404, 'INVITATION_NOT_FOUND');
	}

	if (!invitation.content.guestbook?.enabled) {
		throw error(403, 'GUESTBOOK_IS_DISABLED');
	}

	try {
		const entry = await createGuestbookEntry({
			invitationId: body.invitationId,
			name: body.name,
			message: body.message
		});

		return json({ success: true, entry });
	} catch (err: any) {
		console.error('Guestbook submit error:', err);
		if (err.message === 'NAME_REQUIRED' || err.message === 'MESSAGE_REQUIRED') {
			throw error(400, err.message);
		}
		throw error(500, 'SUBMISSION_FAILED');
	}
};
