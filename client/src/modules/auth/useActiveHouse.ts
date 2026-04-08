import { authClient } from '@/modules/auth/auth.client.ts';

export const useActiveHouse = () => {
    const { data: activeHouse, isPending } = authClient.useActiveOrganization();

    return {
        data: activeHouse,
        isLoading: isPending,
    };
};
