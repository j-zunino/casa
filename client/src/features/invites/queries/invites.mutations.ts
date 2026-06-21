import { mutationOptions } from '@tanstack/react-query';
import { invitesApi } from '../api';

import type { House } from '@/features/houses/types';

export const invitesMutations = {
    create(houseSlug: House['slug'], maxUses?: number) {
        return mutationOptions({
            mutationFn: () => invitesApi.create(houseSlug, maxUses),
        });
    },

    join(inviteCode: string) {
        return mutationOptions({
            mutationFn: () => invitesApi.join(inviteCode),
        });
    },

    update(houseSlug: House['slug']) {
        return mutationOptions({
            mutationFn: ({ inviteCode, maxUses }: { inviteCode: string; maxUses: number | null }) =>
                invitesApi.update(houseSlug, inviteCode, maxUses),
        });
    },

    revoke(houseSlug: House['slug']) {
        return mutationOptions({
            mutationFn: (inviteCode: string) => invitesApi.revoke(inviteCode, houseSlug),
        });
    },
};
