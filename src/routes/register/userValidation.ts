import { z } from 'zod';

export const userSchema = z
	.object({
		email: z
			.string({ required_error: 'Campo requerido' })
			.min(1, { message: 'Demasiado corto' })
			.max(49, { message: 'Demasiado largo' })
			.trim(),
		password: z
			.string({ required_error: 'Campo requerido' })
			.min(6, { message: '6 caracteres al menos' })
			.max(30, { message: 'Contraseña muy larga' })
			.trim(),
		confirmPassword: z.string({ required_error: 'Campo requerido' })
	})

	.superRefine((val, ctx) => {
		if (val.password !== val.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Las contraseñas no coincided',
				path: ['confirmPassword']
			});
		}
	});
