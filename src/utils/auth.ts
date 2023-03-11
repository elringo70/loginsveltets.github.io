import admin from './firebase-admin';
import { dev } from '$app/environment';

const expiresIn = 1000 * 60 * 60 * 27 * 7;
const secure = dev ? '' : 'Secure';
export const post = async (req: Request) => {
	const { idToken } = await req.json();

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
};
