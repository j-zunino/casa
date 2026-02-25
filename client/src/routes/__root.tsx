import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { NavBar } from '../components/shared';

const RootLayout = () => {
    return (
        <>
            <NavBar />

            <Outlet />

            <TanStackRouterDevtools />
        </>
    );
};

export const Route = createRootRoute({ component: RootLayout });
