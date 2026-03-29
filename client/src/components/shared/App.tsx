import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { router } from '../../main';
import { useAuth } from '../../modules/auth';
import { Loading } from '.';

export const App = () => {
    const auth = useAuth();

    useEffect(() => {
        router.invalidate();
    }, [auth.isAuthenticated]);

    if (auth.isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loading size="xl" />
            </div>
        );
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
