import { redirect, type Handle } from '@sveltejs/kit';
import admin from './utils/firebase-admin';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') as string;

	if (event.url.pathname.startsWith('/profile')) {
		if (!token) throw redirect(303, '/');

		try {
			const decodedToken = await admin.auth().verifyIdToken(token);

			const user = {
				name: decodedToken.name,
				email: decodedToken.email,
				picture: decodedToken.picture,
				uid: decodedToken.ui
			};

			event.locals.user = user;
		} catch (error) {
			event.cookies.delete('session');
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	return response;
};
