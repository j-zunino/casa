import { housesQueries } from '@/features/houses/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { CreateHouse, HouseSelect } from '@/features/houses/components';
import { GearSixIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

const Index = () => {
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 p-8">
                <HouseSelect list={houses} />

                {houses.length < 5 && <CreateHouse />}
            </div>

            {houses.length > 0 && (
                <Button variant="outline" asChild>
                    <Link to="/manage-houses">
                        <GearSixIcon />
                        Manage Houses
                    </Link>
                </Button>
            )}
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/')({
    staticData: { showNavbar: false },
    component: Index,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
