import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

const AuthenticatedLayout = () => {
    return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
    component: AuthenticatedLayout,
    beforeLoad: ({ context }) => {
        if (!context.auth.isLoading && !context.auth.isAuthenticated) {
            throw redirect({
                to: '/sign-in',
                replace: true,
            });
        }
    },
});
