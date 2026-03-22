import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignUpForm, SocialSignIn } from '../components/auth';
import { AuthLayout } from '../components/layouts';

const RouteComponent = () => {
    return (
        <AuthLayout
            title="Create account"
            description="Enter your credentials bellow to create your account"
        >
            <SignUpForm />

            <SocialSignIn />
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
