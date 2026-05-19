import '@fontsource-variable/funnel-display/wght.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import { createRootRouteWithContext, useMatches } from '@tanstack/react-router';

import { Navbar } from '@/components/common/Navbar';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import type { AuthContext } from '@/features/auth/types';

interface RouterContext {
    auth: AuthContext;
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

            <TanStackDevtools
                plugins={[
                    {
                        name: 'TanStack Query',
                        render: <ReactQueryDevtoolsPanel />,
                    },
                    {
                        name: 'TanStack Router',
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </div>
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});
