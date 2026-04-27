import { SignUpForm } from '@/features/auth/components';
import { AuthLayout } from '@/layouts';
import { createFileRoute, redirect } from '@tanstack/react-router';

const RouteComponent = () => {
    return (
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
    );
};

export const Route = createFileRoute('/sign-up')({
    component: RouteComponent,
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
            throw redirect({
                to: '/',
                replace: true,
            });
        }
    },
});
