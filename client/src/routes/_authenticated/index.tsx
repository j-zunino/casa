import { createFileRoute } from '@tanstack/react-router';

const Index = () => {
    const { auth } = Route.useRouteContext();

    console.log(auth);

    if (auth.isLoading) {
        return <div>Loading session...</div>;
    }

    if (!auth.isAuthenticated || !auth.user) {
        return <div>No session found, please Sign In</div>;
    }

    return (
        <div className="p-2">
            <h1>Casa</h1>
            <h2>Hello {auth.user.name}!</h2>

            <div>Create or join a Casa group:</div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/')({
    component: Index,
});
