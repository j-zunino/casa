import { Loading } from '@/components/shared';
import { router } from '@/main';
import { useAuth } from '@/modules/auth';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

export const App = () => {
    const { auth, house } = useAuth();

    useEffect(() => {
        if (!auth.isLoading || !auth.isAuthenticated) {
            router.invalidate();
        }
    }, [auth.isAuthenticated, auth.isLoading]);

    if (auth.isLoading || house.isLoading) return <Loading />;

    return <RouterProvider router={router} context={{ auth, house }} />;
};
