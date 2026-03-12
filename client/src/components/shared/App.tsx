import { RouterProvider } from '@tanstack/react-router';
import { router } from '../../main';
import { useAuth } from '../../modules/auth';

export const App = () => {
    const auth = useAuth();

    if (auth.isLoading) {
        return null;
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
