import crypto from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getUsersCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { User } from '$lib/types/invitation';

const COOKIE_NAME = 'inv_session';
const SECRET = env.SESSION_SECRET || 'default-dev-session-secret-change-in-prod-12345';
const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days in seconds

export function createSessionToken(userId: string): string {
	const expires = Date.now() + SESSION_MAX_AGE * 1000;
	const payload = `${userId}:${expires}`;
	const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
	return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifySessionToken(token: string): { userId: string } | null {
	try {
		const [encodedPayload, signature] = token.split('.');
		if (!encodedPayload || !signature) return null;

		const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
		const expectedSignature = crypto
			.createHmac('sha256', SECRET)
			.update(payload)
			.digest('base64url');

		if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
			return null;
		}

		const [userId, expiresStr] = payload.split(':');
		const expires = parseInt(expiresStr, 10);
		if (isNaN(expires) || Date.now() > expires) {
			return null;
		}

		return { userId };
	} catch {
		return null;
	}
}

export function setSessionCookie(cookies: Cookies, userId: string): void {
	const token = createSessionToken(userId);
	cookies.set(COOKIE_NAME, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: SESSION_MAX_AGE
	});
}

export function clearSessionCookie(cookies: Cookies): void {
	cookies.delete(COOKIE_NAME, {
		path: '/'
	});
}

export async function getSessionUser(cookies: Cookies): Promise<User | null> {
	const token = cookies.get(COOKIE_NAME);
	if (!token) return null;

	const verified = verifySessionToken(token);
	if (!verified) return null;

	try {
		const usersCol = await getUsersCollection();
		let filter;
		try {
			filter = { _id: new ObjectId(verified.userId) };
		} catch {
			filter = { _id: verified.userId as unknown as ObjectId };
		}

		const doc = await usersCol.findOne(filter);
		if (!doc || doc.googleId?.startsWith('dev_')) return null;

		return {
			id: doc._id.toString(),
			googleId: doc.googleId,
			email: doc.email,
			name: doc.name,
			avatarUrl: doc.avatarUrl || null,
			role: doc.role || 'user',
			plan: doc.plan || 'free',
			createdAt: doc.createdAt,
			updatedAt: doc.updatedAt
		};
	} catch (err) {
		console.error('Failed to get session user:', err);
		return null;
	}
}
