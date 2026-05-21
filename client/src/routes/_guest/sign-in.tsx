import { createFileRoute } from '@tanstack/react-router';

import { SignInForm } from '@/features/auth/components';
import { AuthLayout } from '@/layouts';

const RouteComponent = () => {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    );
};

export const Route = createFileRoute('/_guest/sign-in')({
    component: RouteComponent,
});
