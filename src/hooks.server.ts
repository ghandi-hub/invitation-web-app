import { error, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getSessionUser } from '$lib/server/session';
import { initIndexes } from '$lib/server/db';

// Initialize indexes asynchronously on server boot
initIndexes().catch((err) => console.warn('Index init warning:', err));

export const handle: Handle = async ({ event, resolve }) => {
	// CSRF validation for mutating requests on standalone API endpoints
	if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(event.request.method)) {
		const origin = event.request.headers.get('origin');
		if (origin) {
			const allowedOrigin = (env.ORIGIN || env.PUBLIC_BASE_URL || '').replace(/\/$/, '');
			const isSameOrigin = origin === event.url.origin;
			const isAllowedOrigin =
				allowedOrigin && (origin === allowedOrigin || origin.startsWith(allowedOrigin));

			if (!isSameOrigin && !isAllowedOrigin) {
				throw error(403, 'Cross-site request forgery detected');
			}
		}
	}

	event.locals.user = await getSessionUser(event.cookies);
	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://res.cloudinary.com https://*.googleusercontent.com https://images.unsplash.com; media-src 'self' blob: https://res.cloudinary.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' ws: wss: https://www.google-analytics.com https://accounts.google.com;"
	);

	return response;
};
