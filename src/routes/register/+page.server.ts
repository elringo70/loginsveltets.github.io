import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	submit: async ({ request }) => {
		const form = await request.formData();

		const body = {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password')
		};

		return { success: true };
	}
};
