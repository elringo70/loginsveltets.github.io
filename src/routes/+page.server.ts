import type { Actions } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';
import { dev } from '$app/environment';

const secure = dev ? '' : 'Secure';
const expiresIn = 1000 * 60 * 60 * 27 * 7;

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const form = Object.fromEntries(await request.formData());
		const token = form.token as string;

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			secure: !secure,
			maxAge: expiresIn
		});

		return { success: true };
	}
};
