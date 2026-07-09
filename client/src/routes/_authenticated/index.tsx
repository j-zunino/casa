import { housesQueries } from "@/features/houses/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { HouseSelect } from "@/features/houses/components";
import { GearSixIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";

const RouteComponent = () => {
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <HouseSelect list={houses} />

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

export const Route = createFileRoute("/_authenticated/")({
    staticData: { showNavbar: false },
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
