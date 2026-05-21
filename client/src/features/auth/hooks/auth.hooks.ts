import { router } from '@/main';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authMutations, authQueries } from '../queries';

export const authHooks = {
    useSession() {
        return useQuery(authQueries.session());
    },

    useSignOut() {
        const queryClient = useQueryClient();

        return useMutation({
            ...authMutations.signOut(),
            onSuccess: async () => {
                queryClient.clear();

                await router.navigate({
                    to: '/sign-in',
                });
            },
        });
    },

    useSignUpEmail() {
        return useMutation({
            ...authMutations.signUpEmail(),
            onSuccess: async () => {
                await router.navigate({
                    to: '/',
                });
            },
        });
    },
};
