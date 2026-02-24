import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => {
    return (
        <>
            <div className="bg-surface-950 flex justify-center border-b border-surface-700">
                <nav className="flex w-full max-w-4xl justify-between gap-2">
                    <Link
                        to="/"
                        className="px-4 py-2 underline-offset-4 [&.active]:underline"
                    >
                        Home
                    </Link>

                    <Link
                        to="/sign-up"
                        className="px-4 py-2 underline-offset-4 [&.active]:underline"
                    >
                        Sign Up
                    </Link>
                </nav>
            </div>

            <Outlet />

            <TanStackRouterDevtools />
        </>
    );
};

export const Route = createRootRoute({ component: RootLayout });
