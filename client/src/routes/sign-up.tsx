import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignUpForm, SocialSignIn } from '../components/auth';

const RouteComponent = () => {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="max-w-sm space-y-8 p-4">
                <div>
                    <h3 className="text-2xl font-bold">Sign Up</h3>
                    <p className="text-secondary-11">
                        Enter your credentials bellow to create your account
                    </p>
                </div>

                <div className="flex gap-2 flex-col">
                    <SignUpForm />

                    <SocialSignIn />
                </div>
            </div>
        </div>
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
