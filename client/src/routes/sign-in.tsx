import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignInForm, SocialSignIn } from '../components/auth';
import { AuthLayout } from '../components/layouts';

const RouteComponent = () => {
    return (
        <AuthLayout
            title="Sign In"
            description="Enter your credentials bellow to Sign In to your account"
        >
            <SignInForm />

            <SocialSignIn />
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
