import { json, type RequestHandler } from '@sveltejs/kit';
import { isSlugAvailable, sanitizeSlug } from '$lib/server/invitations';

export const GET: RequestHandler = async ({ url }) => {
	const rawSlug = url.searchParams.get('slug') || '';
	const excludeId = url.searchParams.get('excludeId') || undefined;

	const cleanSlug = sanitizeSlug(rawSlug);
	if (!cleanSlug) {
		return json({ available: false, slug: '' });
	}

	const available = await isSlugAvailable(cleanSlug, excludeId);
	return json({ available, slug: cleanSlug });
};
