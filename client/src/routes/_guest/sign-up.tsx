import { createFileRoute } from '@tanstack/react-router';

import { SignUpForm } from '@/features/auth/components';
import { AuthLayout } from '@/layouts';

const RouteComponent = () => {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
};

export const Route = createFileRoute('/_guest/sign-up')({
    component: RouteComponent,
});
