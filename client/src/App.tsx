import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { router } from '@/main';

import { Toaster } from '@/components/ui/sonner';
import { Loading } from './components/common/Loading';
import { useAuth } from './features/auth/hooks/useAuth';

export const App = () => {
    const { auth, house } = useAuth();

    useEffect(() => {
        if (!auth.isLoading || !auth.isAuthenticated) {
            router.invalidate();
        }
    }, [auth.isAuthenticated, auth.isLoading]);

    if (auth.isLoading || house.isLoading) return <Loading />;

    return (
        <>
            <RouterProvider router={router} context={{ auth, house }} />
            <Toaster />
        </>
    );
};
