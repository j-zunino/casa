import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '../components/ui';
import { authClient, handleEmailSignIn, handleSignOut } from '../modules/auth';

const Index = () => {
    const { data: session } = authClient.useSession();

    return (
        <div className="flex w-full flex-col items-center space-y-4">
            <h3>Welcome Home!</h3>

            <div className="flex w-full max-w-sm flex-col gap-4 border border-surface-700 p-4">
                <h3 className="text-2xl font-bold">Authentication test</h3>

                {session?.user ? (
                    <>
                        <p>Signed In as: {session.user.name}</p>

                        <div className="flex flex-col gap-4">
                            <Button onClick={handleSignOut}>Sign Out</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Not signed in</p>

                        <div className="flex flex-col gap-2">
                            <Button onClick={handleEmailSignIn}>Sign In</Button>
                            <Link to="/sign-up" className="hover:underline">
                                I don't have an account
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
