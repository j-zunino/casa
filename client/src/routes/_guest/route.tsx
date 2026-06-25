import { authQueries } from "@/features/auth/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

const GuestLayout = () => {
    return <Outlet />;
};

export const Route = createFileRoute("/_guest")({
    component: GuestLayout,
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
