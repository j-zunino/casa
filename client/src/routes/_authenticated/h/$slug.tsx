import { NoActiveHouse } from '@/components/common/ErrorComponents';
import { useAuth } from '@/features/auth/hooks';
import { createFileRoute, Link } from '@tanstack/react-router';

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
