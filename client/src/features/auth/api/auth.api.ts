import { authClient } from '../auth.client';

export const authApi = {
    async getSession() {
        const result = await authClient.getSession();

        return result.data;
    },
};
