import { createFileRoute } from '@tanstack/react-router';
import { SignInForm } from '../components/auth';
import { Button } from '../components/ui';
import { authClient, handleSignOut } from '../modules/auth';

const Index = () => {
    const { data: session } = authClient.useSession();

    return (
        <div className="flex w-full flex-col items-center">
            <div className="max-w-sm p-4">
                <div>
                    <h3 className="text-2xl font-bold">Sign In</h3>
                    <p className="text-surface-200">
                        Enter your credentials bellow to Sign In to your account
                    </p>
                </div>

                {session?.user ? (
                    <>
                        <p>Signed In as: {session.user.name}</p>

                        <div className="flex flex-col gap-4">
                            <Button onClick={handleSignOut}>Sign Out</Button>
                        </div>
                    </>
                ) : (
                    <SignInForm />
                )}
            </div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
