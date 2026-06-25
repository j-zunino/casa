import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
    return <div>Hello "/_authenticated/account/houses/$slug/users"!</div>;
};

export const Route = createFileRoute(
    "/_authenticated/account/houses/$slug/users",
)({
    component: RouteComponent,
});
