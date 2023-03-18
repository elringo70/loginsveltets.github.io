import { redirect, type Actions } from '@sveltejs/kit';

const expiresIn = 1000 * 60 * 60 * 27 * 7;

export const actions: Actions = {
	loginWithGoogle: async ({ request, cookies }) => {
		const body = Object.fromEntries(await request.formData());

		const token = body.token as string;

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: expiresIn
		});

		throw redirect(303, '/profile');
	}
};
