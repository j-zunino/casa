import { env } from "@/lib/zod";
import { authClient } from "../auth.client";

import type { SignInDto, SignUpDto } from "../types";
import type { SocialProvider } from "better-auth";

export const authApi = {
    async getSession() {
        const { data, error } = await authClient.getSession();

        if (error) throw error;

        return data;
    },

    signOut() {
        return authClient.signOut();
    },

    async signUpEmail(input: SignUpDto) {
        const { data, error } = await authClient.signUp.email({
            name: input.name,
            email: input.email,
            password: input.password,
            callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
        });

        if (error) throw error;

        return data;
    },

    async signInEmail(input: SignInDto) {
        const { data, error } = await authClient.signIn.email({
            email: input.email,
            password: input.password,
            rememberMe: true,
            callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
        });

        if (error) throw error;

        return data;
    },

    signInSocial(provider: SocialProvider) {
        return authClient.signIn.social({
            provider,
            callbackURL: env.VITE_BETTER_AUTH_CALLBACK_URL,
        });
    },
};
