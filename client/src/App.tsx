import { router } from '@/main';
import { useEffect } from 'react';
import { useAuth } from './features/auth/hooks/useAuth';

import { Toaster } from '@/components/ui/sonner';
import { RouterProvider } from '@tanstack/react-router';
import { Loading } from './components/common/Loading';

export const App = () => {
    const { auth } = useAuth();

    useEffect(() => {
        if (!auth.isLoading || !auth.isAuthenticated) {
            router.invalidate();
        }
    }, [auth.isAuthenticated, auth.isLoading]);

    if (auth.isLoading) return <Loading />;

    return (
        <>
            <RouterProvider router={router} context={{ auth }} />
            <Toaster />
        </>
    );
};
