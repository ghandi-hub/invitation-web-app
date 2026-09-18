import { redirect, type RequestHandler } from '@sveltejs/kit';
import { generateGoogleOAuthUrl, isGoogleAuthAvailable } from '$lib/server/auth';
import crypto from 'node:crypto';

export const GET: RequestHandler = async ({ url, cookies }) => {
	if (!isGoogleAuthAvailable()) {
		throw redirect(303, '/?auth=unavailable');
	}

	const state = crypto.randomBytes(24).toString('hex');
	cookies.set('oauth_state', state, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 15 // 15 minutes
	});

	const authUrl = generateGoogleOAuthUrl(state, url.origin);
	throw redirect(303, authUrl);
};
