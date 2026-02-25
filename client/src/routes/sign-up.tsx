import { createFileRoute } from '@tanstack/react-router';
import { SignUpForm } from '../components/auth';

const RouteComponent = () => {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="max-w-sm space-y-8">
                <div>
                    <h3 className="text-2xl font-bold">Sign Up</h3>
                    <p className="text-surface-200">
                        Enter your credentials bellow to create your account
                    </p>
                </div>

                <SignUpForm />
            </div>
        </div>
    );
};

export const Route = createFileRoute('/sign-up')({
    component: RouteComponent,
});
