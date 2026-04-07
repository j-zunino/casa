import { router } from '@/main';
import { useAuth } from '@/modules/auth';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Loading } from '@/components/shared';

export const App = () => {
    const auth = useAuth();

    useEffect(() => {
        router.invalidate();
    }, [auth.isAuthenticated]);

    if (auth.isLoading) {
        return <Loading />;
    }

    return (
        <RouterProvider
            router={router}
            context={{
                auth,
            }}
        />
    );
};
