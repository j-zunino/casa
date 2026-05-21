import { env } from '@/lib/zod';
import { authClient } from '../auth.client';

import type { SignInDto, SignUpDto } from '../types';

export const authApi = {
    async getSession() {
        const result = await authClient.getSession();
        return result.data;
    },

    async signOut() {
        const result = await authClient.signOut();
        return result.data;
    },

    async signUpEmail(data: SignUpDto) {
        return authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
        });
    },

    async signInEmail(data: SignInDto) {
        return authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
        });
    },
};
