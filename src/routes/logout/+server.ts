import { redirect, error, type RequestHandler } from '@sveltejs/kit';
import { clearSessionCookie, revokeUserSessions } from '$lib/server/session';

// Do not clear session on GET to prevent CSRF logout via <img>, <iframe>, or cross-site link prefetching
export const GET: RequestHandler = async () => {
	throw redirect(303, '/');
};

export const POST: RequestHandler = async ({ cookies, locals, request, url }) => {
	const origin = request.headers.get('origin');
	if (origin && new URL(origin).origin !== url.origin) {
		throw error(403, 'Cross-site requests are forbidden');
	}

	if (locals.user?.id) {
		await revokeUserSessions(locals.user.id);
	}

	clearSessionCookie(cookies);
	throw redirect(303, '/');
};
