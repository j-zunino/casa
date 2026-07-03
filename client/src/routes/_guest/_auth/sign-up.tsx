import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@/features/auth/components";

const RouteComponent = () => {
    return <SignUpForm />;
};

export const Route = createFileRoute("/_guest/_auth/sign-up")({
    component: RouteComponent,
});
