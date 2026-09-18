import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getInvitationById } from '$lib/server/invitations';
import { getGuestbookEntries } from '$lib/server/guestbook';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(303, '/auth/google');
	}

	const invitation = await getInvitationById(params.id);
	if (!invitation) {
		throw error(404, 'INVITATION_NOT_FOUND');
	}

	if (invitation.userId !== locals.user.id) {
		throw error(403, 'FORBIDDEN');
	}

	const guestbook = await getGuestbookEntries(invitation.id);

	return {
		invitation,
		guestbook
	};
};
