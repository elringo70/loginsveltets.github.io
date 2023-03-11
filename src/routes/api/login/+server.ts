import type { RequestHandler } from '@sveltejs/kit';
import admin from '../../../utils/firebase-admin';
import { dev } from '$app/environment';

const expiresIn = 1000 * 60 * 60 * 27 * 7;
const secure = dev ? '' : 'Secure';

export const POST = (async ({ request }) => {
	const body = await request.json();

	const { idToken } = await request.json();

	try {
		const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
		return {
			status: 200,
			headers: {
				'set-cookie': `session=${sessionCookie}; Max-Age=${expiresIn} Path=/; HttpOnly; ${secure};`
			}
		};
	} catch (error) {
		console.log(error);
		return { status: 500 };
	}

	return new Response(String(body));
}) satisfies RequestHandler;
