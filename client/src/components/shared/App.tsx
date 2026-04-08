import { Loading } from '@/components/shared';
import { router } from '@/main';
import { useActiveHouse, useAuth } from '@/modules/auth';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

export const App = () => {
    const auth = useAuth();
    const activeHouse = useActiveHouse();

    useEffect(() => {
        router.invalidate();
    }, [auth.isAuthenticated, activeHouse.data]);

    if (auth.isLoading || activeHouse.isLoading) {
        return <Loading />;
    }

    return (
        <RouterProvider
            router={router}
            context={{
                auth,
                activeHouse,
            }}
        />
    );
};
