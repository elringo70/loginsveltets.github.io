import type { RequestEvent } from '@sveltejs/kit';
import type { User } from 'firebase/auth';

export const authenticateUser = (event: RequestEvent, user: User) => {
	// get the cookies from the request
	const { cookies } = event;

	// get the user token from the cookie
	const userToken = cookies.get('session');

	// if the user token is not valid, return null
	// this is where you would check the user token against your database
	// to see if it is valid and return the user object
	if (userToken === 'admin') {
		const loggedUser = user;
		return loggedUser;
	}

	return null;
};
