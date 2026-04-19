import { CreateHouseDialog, HouseSelect } from '@/components/house';
import { Button } from '@/components/ui/button';
import { CheckIcon } from '@phosphor-icons/react';
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router';

const RouteComponent = () => {
    const { house } = useRouteContext({ from: '__root__' });

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 p-8">
                <HouseSelect />

                {house.list.length < 5 && <CreateHouseDialog />}
            </div>

            <Button variant="outline" asChild>
                <Link to="/">
                    <CheckIcon />
                    Done
                </Link>
            </Button>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/manage-houses')({
    staticData: { showNavbar: false },
    component: RouteComponent,
});
