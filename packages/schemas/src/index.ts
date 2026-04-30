import { z } from 'zod';

const emailSchema = z.email({ error: 'Please enter a valid email' });

const signInPasswordSchema = z
    .string()
    .min(1, { error: 'Password is required' })
    .max(128, { error: 'Password is too long' });

const signUpPasswordSchema = z
    .string()
    .regex(/[^A-Za-z0-9]/, {
        error: 'Password must contain at least one special character',
    })
    .min(8, { error: 'Password must be at least 8 characters' })
    .max(128, { error: 'Password is too long' });

export const signInSchema = z.object({
    email: emailSchema,
    password: signInPasswordSchema,
});

export const signUpSchema = z
    .object({
        name: z
            .string()
            .min(1, { error: 'Name is required' })
            .max(50, { error: 'Name is too long' }),
        email: emailSchema,
        password: signUpPasswordSchema,
        passwordConfirmation: signUpPasswordSchema,
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        error: 'Password do not match',
        path: ['passwordConfirmation'],
    });

// TODO: Add logo
export const houseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: 'Name is required' })
        .max(50, { error: 'Name is too long' })
        .regex(/^[\p{L}0-9_.,\s'-]+$/u, {
            error: 'Name can only contain letters, numbers, spaces, dots, commas, hyphens and underscores',
        }),
});
