import type { Handle } from '@sveltejs/kit';
import { getSessionUser } from '$lib/server/session';
import { initIndexes } from '$lib/server/db';

// Initialize indexes asynchronously on server boot
initIndexes().catch((err) => console.warn('Index init warning:', err));

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getSessionUser(event.cookies);
	return resolve(event);
};
