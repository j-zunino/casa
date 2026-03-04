import { createFileRoute, Link } from '@tanstack/react-router';
import { authClient } from '../modules/auth';
import { Button, Toast } from '../components/ui';
import { useToast } from '../modules/toast';

const Index = () => {
    const { data: session, isPending } = authClient.useSession();
    const toast = useToast();

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
        <div>
            <h1>Casa</h1>
            <h2>Hello {session.user.name}!</h2>

            <div>Create or join a Casa group:</div>
            <Button
                onClick={() =>
                    toast.open(<Toast title="Lorem ipsum dolor sit amet" />)
                }
            >
                Add toast
            </Button>

            <Button
                onClick={() =>
                    toast.open(
                        <Toast title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ullam?" />,
                    )
                }
            >
                Add toast
            </Button>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
