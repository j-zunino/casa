import { mutationOptions } from '@tanstack/react-query';
import { authApi } from '../api';

export const authMutations = {
    signOut() {
        return mutationOptions({
            mutationFn: authApi.signOut,
        });
    },
};
