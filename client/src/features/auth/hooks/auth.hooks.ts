import { housesKeys } from '@/features/houses/queries';
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
        const queryClient = useQueryClient();

        return useMutation({
            ...authMutations.signUpEmail(),
            onSuccess: async () => {
                queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });
            },
        });
    },

    useSignInEmail() {
        const queryClient = useQueryClient();

        return useMutation({
            ...authMutations.signInEmail(),
            onSuccess: async () => {
                queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });
            },
        });
    },

    useSignInSocial() {
        const queryClient = useQueryClient();

        return useMutation({
            ...authMutations.signInSocial(),
            onSuccess: async () => {
                queryClient.invalidateQueries({
                    queryKey: housesKeys.base(),
                });
            },
        });
    },
};
