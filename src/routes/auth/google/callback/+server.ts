import { redirect, error, type RequestHandler } from '@sveltejs/kit';
import { handleGoogleCallback } from '$lib/server/auth';
import { setSessionCookie } from '$lib/server/session';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const savedState = cookies.get('oauth_state');

	cookies.delete('oauth_state', { path: '/' });

	if (!code || !state || !savedState || state !== savedState) {
		throw error(400, 'Invalid or expired OAuth state');
	}

	try {
		const user = await handleGoogleCallback(code, url.origin);
		setSessionCookie(cookies, user.id);
	} catch (err) {
		console.error('Google OAuth callback failed:', err);
		throw error(500, 'Authentication failed');
	}

	throw redirect(303, '/create');
};
