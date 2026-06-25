import { authQueries } from "@/features/auth/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { Outlet } from "@tanstack/react-router";

const AuthenticatedLayout = () => {
    return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
    component: AuthenticatedLayout,
    beforeLoad: async ({ context }) => {
        const session = await context.queryClient.ensureQueryData(
            authQueries.session(),
        );

        if (!session) {
            throw redirect({
                to: "/sign-in",
                replace: true,
            });
        }
    },
});
