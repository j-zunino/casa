import { RouterProvider } from '@tanstack/react-router';
import { authClient } from '../../modules/auth';
import { router } from '../../main';

export const App = () => {
    const { data: session } = authClient.useSession();

    return (
        <RouterProvider
            router={router}
            context={{
                auth: {
                    isAuthenticated: !!session?.user,
                    user: session?.user ?? null,
                },
            }}
        />
    );
};
