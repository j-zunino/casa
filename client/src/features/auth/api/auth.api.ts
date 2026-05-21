import { authClient } from '../auth.client';

import type { SignUpDto } from '../types';

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
        });
    },
};
