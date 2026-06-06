import { z } from 'zod';

const emailSchema = z.email({
    error: 'please enter a valid email',
});

const passwordSchema = z
    .string()
    .min(1, { error: 'password is required' })
    .max(128, { error: 'password is too long' });

const strongPasswordSchema = passwordSchema
    .min(8, { error: 'password must be at least 8 characters' })
    .regex(/[^A-Za-z0-9]/, {
        error: 'password must contain at least one special character',
    });

const nameSchema = z
    .string()
    .min(1, { error: 'name is required' })
    .max(50, { error: 'name is too long' });

export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export const signUpSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: strongPasswordSchema,
});

export const signUpFormSchema = signUpSchema
    .extend({
        passwordConfirmation: strongPasswordSchema,
    })
    .refine(
        ({ password, passwordConfirmation }) =>
            password === passwordConfirmation,
        {
            error: 'passwords do not match',
            path: ['passwordConfirmation'],
        },
    );
