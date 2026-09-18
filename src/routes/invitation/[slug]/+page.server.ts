import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getInvitationBySlug } from '$lib/server/invitations';
import { getGuestbookEntries } from '$lib/server/guestbook';

export const load: PageServerLoad = async ({ params, locals, url }) => {
	const invitation = await getInvitationBySlug(params.slug);
	if (!invitation) {
		throw error(404, 'Undangan pernikahan tidak ditemukan');
	}

	// Only allow viewing if published, or if the current session user owns this invitation
	const isOwner = locals.user && locals.user.id === invitation.userId;
	if (invitation.status !== 'published' && !isOwner) {
		throw error(404, 'Undangan ini belum dipublikasikan');
	}

	const guestbook = await getGuestbookEntries(invitation.id);

	return {
		invitation,
		guestbook,
		isOwner: Boolean(isOwner),
		recipientName: (url.searchParams.get('to') || '').trim().slice(0, 100)
	};
};
