import { authClient } from '@/modules/auth/auth.client';

export const useAuth = () => {
    const { data: session, isPending } = authClient.useSession();

    return {
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        isLoading: isPending,
    };
};
