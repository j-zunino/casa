import { Loading } from '@/components/shared';
import { router } from '@/main';
import { useAuth, useHouse } from '@/modules/auth';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';

export const App = () => {
    const auth = useAuth();
    const house = useHouse();

    useEffect(() => {
        router.invalidate();
    }, [auth.isAuthenticated, house.active]);

    if (auth.isLoading || house.isLoading) {
        return <Loading />;
    }

    return (
        <RouterProvider
            router={router}
            context={{
                auth,
                house,
            }}
        />
    );
};
