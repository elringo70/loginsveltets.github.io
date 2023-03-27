import type { PageServerLoad } from './$types';
import { error, redirect, type Actions } from '@sveltejs/kit';
import admin from 'firebase-admin';

const expiresIn = 1000 * 60 * 60 * 27 * 7;

export const load = (async ({ locals }) => {
	try {
		return { user: JSON.parse(JSON.stringify(locals.user)) };
	} catch (err: any) {
		console.log('Error:', err);
		throw error(500, err);
	}
}) satisfies PageServerLoad;

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
	},
	loginWithEmailAndPassword: async ({ request }) => {
		const formData = await request.formData();

		const body = {
			email: formData.get('email'),
			password: formData.get('password')
		};
	}
};
