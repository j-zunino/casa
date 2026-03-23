import { createFileRoute } from '@tanstack/react-router';
import { CreateHouseForm } from '../../components/house';
import { AuthLayout } from '../../components/layouts';

const Index = () => {
    const { auth } = Route.useRouteContext();

    // TODO: Convert to loading component
    if (auth.isLoading) {
        return <div>Loading session...</div>;
    }

    if (!auth.isAuthenticated || !auth.user) {
        return <div>No session found, please Sign In</div>;
    }
    //

    // NOTE: Only render if user doesn't have active House
    return (
        <AuthLayout
            title="Create House"
            description="This will be your shared space"
        >
            <CreateHouseForm />
        </AuthLayout>
    );
};

export const Route = createFileRoute('/_authenticated/')({
    component: Index,
});
