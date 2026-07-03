import { createFileRoute, Outlet } from "@tanstack/react-router";

const RouteComponent = () => {
    return (
        <div className="mx-auto w-full max-w-md p-4">
            <Outlet />
        </div>
    );
};

export const Route = createFileRoute("/_guest/_auth")({
    component: RouteComponent,
});
