import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { User } from 'better-auth';
import { NavBar } from '../components/shared';

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
            <NavBar />

            <Outlet />

            <TanStackRouterDevtools />
        </>
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});
