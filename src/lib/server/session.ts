import crypto from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getUsersCollection } from '$lib/server/db';
import { ObjectId } from 'mongodb';
import type { User } from '$lib/types/invitation';

const COOKIE_NAME = 'inv_session';
const DEFAULT_DEV_SECRET = 'default-dev-session-secret-change-in-prod-12345';
const SESSION_MAX_AGE = 60 * 60 * 24 * 14; // 14 days in seconds

function getSessionSecret(): string {
	const secret = env.SESSION_SECRET;
	if (process.env.NODE_ENV === 'production') {
		if (!secret || secret === DEFAULT_DEV_SECRET || secret.length < 32) {
			throw new Error(
				'FATAL: SESSION_SECRET must be configured with a strong secret (at least 32 characters) in production.'
			);
		}
		return secret;
	}
	return secret || DEFAULT_DEV_SECRET;
}

export function createSessionToken(userId: string, tokenVersion = 1): string {
	const secret = getSessionSecret();
	const expires = Date.now() + SESSION_MAX_AGE * 1000;
	const payload = `${userId}:${expires}:${tokenVersion}`;
	const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
	return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifySessionToken(token: string): { userId: string; tokenVersion: number } | null {
	try {
		const [encodedPayload, signature] = token.split('.');
		if (!encodedPayload || !signature) return null;

		const payload = Buffer.from(encodedPayload, 'base64url').toString('utf8');
		const secret = getSessionSecret();
		const expectedSignature = crypto
			.createHmac('sha256', secret)
			.update(payload)
			.digest('base64url');

		const sigBuffer = Buffer.from(signature);
		const expectedBuffer = Buffer.from(expectedSignature);
		if (
			sigBuffer.length !== expectedBuffer.length ||
			!crypto.timingSafeEqual(sigBuffer, expectedBuffer)
		) {
			return null;
		}

		const [userId, expiresStr, versionStr] = payload.split(':');
		const expires = parseInt(expiresStr, 10);
		if (isNaN(expires) || Date.now() > expires) {
			return null;
		}

		const tokenVersion = versionStr ? parseInt(versionStr, 10) : 1;

		return { userId, tokenVersion: isNaN(tokenVersion) ? 1 : tokenVersion };
	} catch {
		return null;
	}
}

export function setSessionCookie(cookies: Cookies, userId: string, tokenVersion = 1): void {
	const token = createSessionToken(userId, tokenVersion);
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

export async function revokeUserSessions(userId: string): Promise<void> {
	try {
		const usersCol = await getUsersCollection();
		let filter;
		try {
			filter = { _id: new ObjectId(userId) };
		} catch {
			filter = { _id: userId as unknown as ObjectId };
		}
		await usersCol.updateOne(filter, { $inc: { tokenVersion: 1 } });
	} catch (err) {
		console.error('Failed to revoke user sessions:', err);
	}
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

		const currentTokenVersion = typeof doc.tokenVersion === 'number' ? doc.tokenVersion : 1;
		if (verified.tokenVersion < currentTokenVersion) {
			return null;
		}

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
