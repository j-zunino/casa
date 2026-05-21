// TODO: Move logic to server

import { env } from '@/lib/zod';
import { authClient } from '../auth.client';

export const handleGithubSignIn = async () => {
    await authClient.signIn.social({
        provider: 'github',
        callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
    });
};
