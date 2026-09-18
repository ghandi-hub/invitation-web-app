import { json, error, type RequestHandler } from '@sveltejs/kit';
import { createRsvp } from '$lib/server/rsvp';
import { getInvitationById } from '$lib/server/invitations';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json().catch(() => null);
	if (!body || !body.invitationId || !body.name || !body.attendance) {
		throw error(400, 'MISSING_REQUIRED_FIELDS');
	}

	const invitation = await getInvitationById(body.invitationId);
	if (!invitation) {
		throw error(404, 'INVITATION_NOT_FOUND');
	}

	if (!invitation.content.rsvp?.enabled) {
		throw error(403, 'RSVP_IS_DISABLED');
	}

	try {
		const rsvp = await createRsvp({
			invitationId: body.invitationId,
			name: body.name,
			attendance: body.attendance,
			guestCount: body.guestCount || 1,
			message: body.message || null
		});

		return json({ success: true, rsvp });
	} catch (err: any) {
		console.error('RSVP submit error:', err);
		if (err.message === 'NAME_REQUIRED' || err.message === 'INVALID_ATTENDANCE') {
			throw error(400, err.message);
		}
		throw error(500, 'SUBMISSION_FAILED');
	}
};
