import { redirect, type Handle } from '@sveltejs/kit';
import admin from './utils/firebase-admin';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/profile')) {
		if (!event.locals.user) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	return response;
};
