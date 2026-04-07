import type { User } from '@/modules/auth';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '../components/shared';

import '@fontsource-variable/funnel-display/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';

interface RouterContext {
    auth: {
        user: User | null;
        isAuthenticated: boolean;
        isLoading: boolean;
    };
}

const RootLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <TanStackRouterDevtools />
        </>
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});
