import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

const AuthenticatedLayout = () => {
    return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
    component: AuthenticatedLayout,
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/sign-in',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
});
