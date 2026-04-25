import { authClient } from '@/modules/auth/auth.client.ts';
import type { AuthHouseContext } from './auth.types';

export const useAuth = (): AuthHouseContext => {
    const { data: session, isPending: isPendingAuth } = authClient.useSession();

    const { data: active, isPending: isPendingActive } =
        authClient.useActiveOrganization();

    const { data: list, isPending: isPendingList } =
        authClient.useListOrganizations();

    const user = session?.user ?? null;
    const isAuthenticated = !!user;

    if (!isAuthenticated) {
        return {
            auth: {
                user: null,
                isAuthenticated: false,
                isLoading: false,
            },
            house: {
                active: null,
                list: [],
                isLoading: false,
            },
        };
    }

    return {
        auth: {
            user,
            isAuthenticated,
            isLoading: isPendingAuth,
        },
        house: {
            active: active ?? null,
            list: list ?? [],
            isLoading: isPendingActive || isPendingList,
        },
    };
};