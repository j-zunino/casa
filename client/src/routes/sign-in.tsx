import { SignInForm } from '@/features/auth/components';
import { AuthLayout } from '@/layouts';
import { createFileRoute, redirect } from '@tanstack/react-router';

const RouteComponent = () => {
    return (
        <AuthLayout>
            <SignInForm />
        </AuthLayout>
    );
};

export const Route = createFileRoute('/sign-in')({
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
