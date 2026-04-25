import { NoActiveHouse } from '@/components/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth } from '@/modules/auth';

const RouteComponent = () => {
    const { house } = useAuth();

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
