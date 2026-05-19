import { housesQueries } from '@/features/houses/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { CreateHouse, HouseSelect } from '@/features/houses/components';
import { CheckIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

const RouteComponent = () => {
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 p-8">
                <HouseSelect list={houses} editMode />

                {houses.length < 5 && <CreateHouse />}
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
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
