import type { Actions } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';
import { dev } from '$app/environment';

const secure = dev ? '' : 'Secure';
const expiresIn = 1000 * 60 * 60 * 27 * 7;

export const actions: Actions = {};
