import type { PageServerLoad } from './$types';
import { getUserInvitations } from '$lib/server/invitations';
import { isGoogleAuthAvailable } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	let invitations: any[] = [];
	if (locals.user) {
		invitations = await getUserInvitations(locals.user.id);
	}

	return {
		user: locals.user,
		invitations,
		isGoogleAuth: isGoogleAuthAvailable()
	};
};
