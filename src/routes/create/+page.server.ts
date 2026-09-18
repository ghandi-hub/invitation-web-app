import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserInvitations, createDefaultInvitation } from '$lib/server/invitations';
import { isGoogleAuthAvailable } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		if (isGoogleAuthAvailable()) {
			throw redirect(303, '/auth/google');
		} else {
			throw redirect(303, '/?auth=unavailable');
		}
	}

	const existing = await getUserInvitations(locals.user.id);
	if (existing.length > 0) {
		throw redirect(303, `/create/${existing[0].id}`);
	}

	const newInvitation = await createDefaultInvitation(locals.user.id);
	throw redirect(303, `/create/${newInvitation.id}`);
};
