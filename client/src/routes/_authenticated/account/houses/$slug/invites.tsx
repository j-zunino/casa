import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

const RouteComponent = () => {
    return <div></div>;
};

export const Route = createFileRoute(
    '/_authenticated/account/houses/$slug/invites',
)({
    component: RouteComponent,
});
