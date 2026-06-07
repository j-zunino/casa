import { queryOptions } from '@tanstack/react-query';
import { invitesApi } from '../api';
import { invitesKeys } from './invites.keys';

import type { House } from '@/features/houses/types';

export const invitesQueries = {
    // TODO: Include count?
    all(houseSlug: House['slug']) {
        return queryOptions({
            queryKey: invitesKeys.list(houseSlug),
            queryFn: () => invitesApi.getAll(houseSlug),
        });
    },

    details(inviteCode: string) {
        return queryOptions({
            queryKey: invitesKeys.details(inviteCode),
            queryFn: () => invitesApi.getDetails(inviteCode),
        });
    },
};
