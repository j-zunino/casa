import { createFileRoute, Link } from '@tanstack/react-router';

const RouteComponent = () => {
    return (
        <div>
            <p>Hello "/sign-up"!</p>
            <Link to="/" className="hover:underline">
                I already have an account
            </Link>
        </div>
    );
};

export const Route = createFileRoute('/sign-up')({
    component: RouteComponent,
});
