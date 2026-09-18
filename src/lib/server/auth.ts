import { env } from '$env/dynamic/private';
import { getUsersCollection } from '$lib/server/db';
import type { User } from '$lib/types/invitation';

const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
const PUBLIC_BASE_URL = env.PUBLIC_BASE_URL || 'http://localhost:5173';

export function isGoogleAuthAvailable(): boolean {
	return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);
}

export function generateGoogleOAuthUrl(state: string): string {
	if (!GOOGLE_CLIENT_ID) {
		throw new Error('GOOGLE_CLIENT_ID is not configured');
	}

	const redirectUri = `${PUBLIC_BASE_URL}/auth/google/callback`;
	const params = new URLSearchParams({
		client_id: GOOGLE_CLIENT_ID,
		redirect_uri: redirectUri,
		response_type: 'code',
		scope: 'openid email profile',
		state,
		access_type: 'offline',
		prompt: 'select_account'
	});

	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function handleGoogleCallback(code: string): Promise<User> {
	if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
		throw new Error('Google OAuth credentials not configured');
	}

	const redirectUri = `${PUBLIC_BASE_URL}/auth/google/callback`;

	const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			code,
			client_id: GOOGLE_CLIENT_ID,
			client_secret: GOOGLE_CLIENT_SECRET,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		})
	});

	if (!tokenRes.ok) {
		const err = await tokenRes.text();
		throw new Error(`Failed to exchange token with Google: ${err}`);
	}

	const tokenData = await tokenRes.json();
	const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
		headers: { Authorization: `Bearer ${tokenData.access_token}` }
	});

	if (!userRes.ok) {
		throw new Error('Failed to fetch user profile from Google');
	}

	const profile = await userRes.json();
	return findOrCreateGoogleUser({
		googleId: profile.sub,
		email: profile.email,
		name: profile.name || profile.email.split('@')[0],
		avatarUrl: profile.picture || null
	});
}

export async function findOrCreateGoogleUser(params: {
	googleId: string;
	email: string;
	name: string;
	avatarUrl: string | null;
}): Promise<User> {
	const usersCol = await getUsersCollection();
	const now = new Date();

	let userDoc = await usersCol.findOne({
		$or: [{ googleId: params.googleId }, { email: params.email }]
	});

	if (!userDoc) {
		const insertResult = await usersCol.insertOne({
			googleId: params.googleId,
			email: params.email,
			name: params.name,
			avatarUrl: params.avatarUrl,
			role: 'user',
			plan: 'free',
			createdAt: now,
			updatedAt: now
		});
		return {
			id: insertResult.insertedId.toString(),
			googleId: params.googleId,
			email: params.email,
			name: params.name,
			avatarUrl: params.avatarUrl,
			role: 'user',
			plan: 'free',
			createdAt: now,
			updatedAt: now
		};
	}

	await usersCol.updateOne(
		{ _id: userDoc._id },
		{
			$set: {
				googleId: params.googleId,
				name: params.name || userDoc.name,
				avatarUrl: params.avatarUrl || userDoc.avatarUrl,
				updatedAt: now
			}
		}
	);

	return {
		id: userDoc._id.toString(),
		googleId: params.googleId,
		email: userDoc.email,
		name: params.name || userDoc.name,
		avatarUrl: params.avatarUrl || userDoc.avatarUrl,
		role: userDoc.role || 'user',
		plan: userDoc.plan || 'free',
		createdAt: userDoc.createdAt,
		updatedAt: now
	};
}
