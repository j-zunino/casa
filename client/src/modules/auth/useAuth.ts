import { authClient } from './auth.client';

export function useAuth() {
    const { data: session, isPending } = authClient.useSession();

    return {
        user: session?.user ?? null,
        isAuthenticated: !!session?.user,
        isLoading: isPending,
    };
}
