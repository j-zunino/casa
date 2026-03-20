import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { router } from '../../main';
import { useAuth } from '../../modules/auth';

export const App = () => {
    const auth = useAuth();

    useEffect(() => {
        router.invalidate();
    }, [auth.isAuthenticated]);

    if (auth.isLoading) return null;

    return (
        <RouterProvider
            router={router}
            context={{
                auth,
            }}
        />
    );
};
