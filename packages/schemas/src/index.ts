import { z } from 'zod';

const emailSchema = z.email({ error: 'Please enter a valid email' });

const signInPasswordSchema = z
    .string()
    .min(1, { error: 'Password is required' });

const signUpPasswordSchema = z
    .string()
    .regex(/[^A-Za-z0-9]/, {
        error: 'Password must contain at least one special character',
    })
    .min(8, { error: 'Password must be at least 8 characters' });

export const signInSchema = z.object({
    email: emailSchema,
    password: signInPasswordSchema,
});

export const signUpSchema = z
    .object({
        name: z.string().min(1, { error: 'Name is required' }),
        email: emailSchema,
        password: signUpPasswordSchema,
        passwordConfirmation: signUpPasswordSchema,
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        error: 'Password do not match',
        path: ['passwordConfirmation'],
    });
