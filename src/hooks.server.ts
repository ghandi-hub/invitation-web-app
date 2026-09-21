import type { Handle } from '@sveltejs/kit';
import { getSessionUser } from '$lib/server/session';
import { initIndexes } from '$lib/server/db';

// Initialize indexes asynchronously on server boot
initIndexes().catch((err) => console.warn('Index init warning:', err));

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getSessionUser(event.cookies);
	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	return response;
};
