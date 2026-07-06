import { createFileRoute } from "@tanstack/react-router";

import { BackButton } from "@/components/common/BackButton";
import { Outlet } from "@tanstack/react-router";

const RouteComponent = () => {
    return (
        <div className="mx-auto flex h-full w-full max-w-xl grow flex-col gap-1.5 p-4">
            <BackButton />

            <Outlet />
        </div>
    );
};

export const Route = createFileRoute("/_authenticated/account")({
    component: RouteComponent,
});
