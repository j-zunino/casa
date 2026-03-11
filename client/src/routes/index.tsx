import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '../components/ui';
import { authClient } from '../modules/auth';
import toast from '../modules/toast';

const Index = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <div>Loading session...</div>;

    if (!session) {
        return (
            <div>
                <h1>Casa</h1>
                <h2>Please Sign-In to access the casa dashboard</h2>

                <Link to="/sign-in">Sign In</Link>
            </div>
        );
    }

    return (
        <div className="p-2">
            <h1>Casa</h1>
            <h2>Hello {session.user.name}!</h2>

            <div>Create or join a Casa group:</div>

            <div className="flex flex-wrap gap-2">
                <Button onClick={() => toast('Hello world')}>Toast</Button>
                <Button onClick={() => toast.success('Successfully saved')}>
                    Success toast
                </Button>
                <Button onClick={() => toast.error("Didn't work")}>
                    Error toast
                </Button>
                <Button
                    onClick={() =>
                        toast.promise(new Promise((r) => setTimeout(r, 2000)), {
                            loading: 'Loading...',
                            success: 'Done!',
                            error: 'Failed',
                        })
                    }
                >
                    Promise toast
                </Button>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
