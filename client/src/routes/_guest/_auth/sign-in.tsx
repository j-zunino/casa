import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@/features/auth/components";

const RouteComponent = () => {
    return <SignInForm />;
};

export const Route = createFileRoute("/_guest/_auth/sign-in")({
    component: RouteComponent,
});
