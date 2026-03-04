import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { NavBar } from '../components/shared';
import { authClient } from '../modules/auth';
import { ToastProvider } from '../modules/toast/ToastProvider';

interface RouteContext {
    auth: {
        user: Awaited<ReturnType<typeof authClient.getSession>>['user'] | null;
        isAuthenticated: boolean;
    };
}

const RootLayout = () => {
    return (
        <ToastProvider>
            <NavBar />

            <Outlet />

            <TanStackRouterDevtools />
        </ToastProvider>
    );
};

export const Route = createRootRouteWithContext<RouteContext>()({
    component: RootLayout,
});
