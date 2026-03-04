import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { NavBar } from '../components/shared';
import { ToastProvider } from '../modules/toast/ToastProvider';

const RootLayout = () => {
    return (
        <ToastProvider>
            <NavBar />

            <Outlet />

            <TanStackRouterDevtools />
        </ToastProvider>
    );
};

export const Route = createRootRoute({ component: RootLayout });
