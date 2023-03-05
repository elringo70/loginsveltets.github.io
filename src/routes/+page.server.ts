import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	submit: async ({ request }) => {
		console.log('submit');

		return { success: true };
	}
};
