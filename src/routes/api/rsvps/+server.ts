import { json, error, type RequestHandler } from '@sveltejs/kit';
import { createRsvp } from '$lib/server/rsvp';
import { getInvitationById } from '$lib/server/invitations';
import { checkRateLimit } from '$lib/server/rateLimiter';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let clientIp: string;
	try {
		clientIp = getClientAddress();
	} catch {
		clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
	}

	const rateLimit = checkRateLimit('rsvps', clientIp, {
		windowMs: 60 * 1000,
		maxRequests: 5
	});

	if (!rateLimit.allowed) {
		throw error(429, 'Terlalu banyak pengiriman RSVP. Silakan coba lagi nanti.');
	}

	const body = await request.json().catch(() => null);
	if (!body || !body.invitationId || !body.name || !body.attendance) {
		throw error(400, 'MISSING_REQUIRED_FIELDS');
	}

	// Honeypot bot protection
	if (body.website) {
		throw error(400, 'INVALID_SUBMISSION');
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
	} catch (err: unknown) {
		console.error('RSVP submit error:', err);
		const message = err instanceof Error ? err.message : '';
		if (message === 'NAME_REQUIRED' || message === 'INVALID_ATTENDANCE') {
			throw error(400, message);
		}
		throw error(500, 'SUBMISSION_FAILED');
	}
};
