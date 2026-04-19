import { Navbar } from '@/components/shared';
import type { AuthContext, HouseContext } from '@/modules/auth';
import {
    Outlet,
    createRootRouteWithContext,
    useMatches,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import '@fontsource-variable/funnel-display/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';

interface RouterContext {
    auth: AuthContext;
    house: HouseContext;
}

const RootLayout = () => {
    const showNavbar = useMatches({
        select: (matches) =>
            !matches.some((m) => m.staticData?.showNavbar === false),
    });

    return (
        <div className="flex min-h-screen flex-col">
            {showNavbar && <Navbar />}

            <div className="flex grow flex-col">
                <Outlet />
            </div>

            <TanStackRouterDevtools />
        </div>
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});
