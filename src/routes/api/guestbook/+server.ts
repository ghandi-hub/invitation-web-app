import { json, error, type RequestHandler } from '@sveltejs/kit';
import { createGuestbookEntry } from '$lib/server/guestbook';
import { getInvitationById } from '$lib/server/invitations';
import { checkRateLimit } from '$lib/server/rateLimiter';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let clientIp: string;
	try {
		clientIp = getClientAddress();
	} catch {
		clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
	}

	const rateLimit = checkRateLimit('guestbook', clientIp, {
		windowMs: 60 * 1000,
		maxRequests: 5
	});

	if (!rateLimit.allowed) {
		throw error(429, 'Terlalu banyak pengiriman pesan. Silakan coba lagi nanti.');
	}

	const body = await request.json().catch(() => null);
	if (!body || !body.invitationId || !body.name || !body.message) {
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
	} catch (err: unknown) {
		console.error('Guestbook submit error:', err);
		const message = err instanceof Error ? err.message : '';
		if (message === 'NAME_REQUIRED' || message === 'MESSAGE_REQUIRED') {
			throw error(400, message);
		}
		throw error(500, 'SUBMISSION_FAILED');
	}
};
