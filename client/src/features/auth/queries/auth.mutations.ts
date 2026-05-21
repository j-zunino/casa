import { mutationOptions } from '@tanstack/react-query';
import { authApi } from '../api';

export const authMutations = {
    signOut() {
        return mutationOptions({
            mutationFn: authApi.signOut,
        });
    },

    signUpEmail() {
        return mutationOptions({
            mutationFn: authApi.signUpEmail,
        });
    },

    signInEmail() {
        return mutationOptions({
            mutationFn: authApi.signInEmail,
        });
    },
};
