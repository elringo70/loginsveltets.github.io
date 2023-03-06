import type { Actions } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';

export const actions: Actions = {
	submit: async ({ request }) => {
		const form = await request.formData();

		const body = {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password')
		};

		return { success: true };
	},
	googleLogin: async ({ request }) => {
		try {
			const form = await request.formData();
			const terms = form.get('terms');

			console.log(terms);
		} catch (err) {
			console.error(err);
			return error(500, { message: 'Error en el servidor' });
		}
	}
};
