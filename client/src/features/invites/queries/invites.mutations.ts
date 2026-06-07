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
};
