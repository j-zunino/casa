import { housesKeys } from '@/features/houses/queries/houses.keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invitesKeys } from '../queries/invites.keys';
import { invitesMutations } from '../queries/invites.mutations';

import type { House } from '@/features/houses/types';

export const invitesHooks = {
    useCreateInvite(houseSlug: House['slug']) {
        const queryClient = useQueryClient();
        return useMutation({
            ...invitesMutations.create(houseSlug),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: invitesKeys.list(houseSlug),
                });
            },
        });
    },

    useJoinInvite(inviteCode: string) {
        const queryClient = useQueryClient();
        return useMutation({
            ...invitesMutations.join(inviteCode),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: housesKeys.list(),
                });
            },
        });
    },

    useRevokeInvite(houseSlug: House['slug']) {
        const queryClient = useQueryClient();
        return useMutation({
            ...invitesMutations.revoke(houseSlug),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: invitesKeys.list(houseSlug),
                });
            },
        });
    },
};
