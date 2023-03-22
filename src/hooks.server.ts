import { redirect, type Handle } from '@sveltejs/kit';
import admin from './utils/firebase-admin';

const publicRoutes = ['/', '/register', '/login'];

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') as string;
	console.log(event.route.id);

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);

		const user = {
			name: decodedToken.name,
			email: decodedToken.email,
			picture: decodedToken.picture,
			uid: decodedToken.uid
		};

		event.locals.user = user;

		if (event.route.id !== null && event.route.id.startsWith('/profile')) {
			throw redirect(303, '/profile');
		}
	} catch (error) {
		event.locals.user = null;
		event.cookies.delete('session');
		console.log('catch');
	}

	const response = await resolve(event);
	return response;
};
