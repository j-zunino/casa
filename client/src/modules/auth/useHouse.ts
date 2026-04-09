import { authClient } from '@/modules/auth/auth.client.ts';
import type { HouseContext } from './auth.types';

export const useHouse = (): HouseContext => {
    const { data: active, isPending: isPendingActive } =
        authClient.useActiveOrganization();

    const { data: list, isPending: isPendingList } =
        authClient.useListOrganizations();

    return {
        active: active ?? null,
        list: list ?? [],
        isLoading: isPendingActive || isPendingList,
    };
};
