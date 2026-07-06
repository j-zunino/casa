import { authQueries } from "@/features/auth/queries";
import "@fontsource-variable/funnel-display/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { createRootRouteWithContext, useMatches } from "@tanstack/react-router";

import { Navbar } from "@/components/common/Navbar";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import type { QueryClient } from "@tanstack/react-query";

interface RouterContext {
    queryClient: QueryClient;
}

const RootLayout = () => {
    const showNavbar = useMatches({
        select: (matches) =>
            !matches.some((m) => m.staticData.showNavbar === false),
    });

    return (
        <div className="flex h-svh flex-col">
            {showNavbar && <Navbar />}

            <div className="flex grow flex-col overflow-y-auto">
                <Outlet />
            </div>

            <TanStackDevtools
                plugins={[
                    {
                        name: "TanStack Query",
                        render: <ReactQueryDevtoolsPanel />,
                    },
                    {
                        name: "TanStack Router",
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </div>
    );
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(authQueries.session());
    },
});
