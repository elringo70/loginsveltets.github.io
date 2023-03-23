import type { PageServerLoad } from './$types';
import { error, redirect, type Actions } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	try {
		return { user: JSON.parse(JSON.stringify(locals.user)) };
	} catch (err: any) {
		console.log('Error:', err);
		throw error(500, err);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	logoutFromGoogle: async ({ cookies, locals }) => {
		try {
			locals.user = null;
			cookies.delete('session');

			throw redirect(303, '/');
		} catch (error) {
			locals.user = null;
			cookies.delete('session');
			throw redirect(303, '/');
		}
	}
};
