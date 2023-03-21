import type { Handle } from '@sveltejs/kit';
import { auth } from './utils/firebase';

const publicRoutes = ['/', '/register', '/login'];

export const handle: Handle = async ({ event, resolve }) => {
	try {
		console.log(auth);
	} catch (error) {
		event.locals.user = null;
		event.cookies.delete('session');
	}

	const response = await resolve(event);
	return response;
};
