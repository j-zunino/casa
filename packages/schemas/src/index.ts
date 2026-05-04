import { z } from 'zod';

const emailSchema = z.email({ error: 'please enter a valid email' });

const signInPasswordSchema = z
    .string()
    .min(1, { error: 'password is required' })
    .max(128, { error: 'password is too long' });

const signUpPasswordSchema = z
    .string()
    .regex(/[^A-Za-z0-9]/, {
        error: 'password must contain at least one special character',
    })
    .min(8, { error: 'password must be at least 8 characters' })
    .max(128, { error: 'password is too long' });

export const signInSchema = z.object({
    email: emailSchema,
    password: signInPasswordSchema,
});

export const signUpSchema = z
    .object({
        name: z
            .string()
            .min(1, { error: 'name is required' })
            .max(50, { error: 'name is too long' }),
        email: emailSchema,
        password: signUpPasswordSchema,
        passwordConfirmation: signUpPasswordSchema,
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        error: 'password do not match',
        path: ['passwordConfirmation'],
    });

// TODO: Add logo
export const houseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: 'name is required' })
        .max(50, { error: 'name is too long' })
        .regex(/^[\p{L}0-9_.,\s'-]+$/u, {
            error: 'name can only contain letters, numbers, spaces, dots, commas, hyphens and underscores',
        }),
});
