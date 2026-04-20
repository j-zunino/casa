import { NoActiveHouse } from '@/components/shared';
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router';

const RouteComponent = () => {
    const { house } = useRouteContext({ from: '__root__' });

    if (!house || !house.active) return <NoActiveHouse />;

    return (
        <div>
            <Link to="/">Back</Link>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/h/$slug')({
    staticData: { homePath: '/h/$slug' },
    component: RouteComponent,
});
