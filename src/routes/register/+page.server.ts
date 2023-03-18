import { redirect, fail, type Actions } from '@sveltejs/kit';
import { validateData } from '../../utils/zodValidation';
import { userSchema } from './userValidation';

const expiresIn = 1000 * 60 * 60 * 27 * 7;

export const actions: Actions = {
	createUserWithGoogle: async ({ request }) => {
		const form = await request.formData();
		const { formData, errors } = await validateData(form, userSchema);

		if (errors) {
			return fail(401, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		return { success: true };
	},
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
