import { authQueries } from "@/features/auth/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

const RouteComponent = () => {
    return <Outlet />;
};

export const Route = createFileRoute("/_guest")({
    component: RouteComponent,
    beforeLoad: async ({ context }) => {
        const session = await context.queryClient.ensureQueryData(
            authQueries.session(),
        );

        if (session) {
            throw redirect({
                to: "/",
                replace: true,
            });
        }
    },
});
