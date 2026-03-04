import { createFileRoute } from '@tanstack/react-router';
import { SignInForm } from '../components/auth';

const RouteComponent = () => {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="max-w-sm space-y-8 p-4">
                <div>
                    <h3 className="text-2xl font-bold">Sign In</h3>
                    <p className="text-secondary-11">
                        Enter your credentials bellow to Sign In to your account
                    </p>
                </div>

                <SignInForm />
            </div>
        </div>
    );
};

export const Route = createFileRoute('/sign-in')({
    component: RouteComponent,
});
