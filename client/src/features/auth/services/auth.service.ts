// TODO: Move logic to server

import { env } from '@/lib/zod';
import { authClient } from '../auth.client';

export const handleEmailSignIn = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
    });

    if (error) throw new Error(error.message);

    return data;
};

export const handleGithubSignIn = async () => {
    await authClient.signIn.social({
        provider: 'github',
        callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
    });
};
