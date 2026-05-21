import { authClient } from '../auth.client';

export const authApi = {
    async getSession() {
        const result = await authClient.getSession();
        return result.data;
    },

    async signOut() {
        const result = await authClient.signOut();
        return result.data;
    },
};
