import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { NavBar } from '../components/shared';
import { authClient } from '../modules/auth';

interface RouteContext {
    auth: {
        user: Awaited<ReturnType<typeof authClient.getSession>>['user'] | null;
        isAuthenticated: boolean;
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

export const Route = createRootRouteWithContext<RouteContext>()({
    component: RootLayout,
});
