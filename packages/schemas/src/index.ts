import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(1, { error: 'Password is required' })
    .min(8, { error: 'Password must be at least 8 characters' })
    .regex(/[^A-Za-z0-9]/, {
        error: 'Password must contain at least one special character',
    });

export const signUpSchema = z
    .object({
        name: z.string().min(1, { error: 'Name is required' }),
        email: z.email({ error: 'Please enter a valid email' }),
        password: passwordSchema,
        passwordConfirmation: passwordSchema,
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        error: 'Password do not match',
        path: ['passwordConfirmation'],
    });
