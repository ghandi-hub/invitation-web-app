import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getInvitationById } from '$lib/server/invitations';
import { isGoogleAuthAvailable } from '$lib/server/auth';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) {
		if (isGoogleAuthAvailable()) {
			throw redirect(303, '/auth/google');
		} else {
			throw redirect(303, '/?auth=unavailable');
		}
	}

	const invitation = await getInvitationById(params.id);
	if (!invitation) {
		throw error(404, 'INVITATION_NOT_FOUND');
	}

	if (invitation.userId !== locals.user.id) {
		throw error(403, 'FORBIDDEN');
	}

	return {
		invitation,
		user: locals.user
	};
};
