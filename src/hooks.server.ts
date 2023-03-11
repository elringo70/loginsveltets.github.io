/* import { redirect, type Handle } from '@sveltejs/kit';
import { authenticateUser } from './lib/server';
import admin from './utils/firebase-admin';

export const handle: Handle = async ({ event, resolve }) => {
	console.log(event.locals);
	//event.locals.user = authenticateUser(event, );

	console.log(admin);

	if (event.url.pathname.startsWith('/profile')) {
		if (!event.locals.user) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);

	return response;
}; */
