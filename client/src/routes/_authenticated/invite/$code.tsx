import { invitesQueries } from '@/features/invites/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { HouseLineIcon } from '@phosphor-icons/react';

const RouteComponent = () => {
    const { code } = Route.useParams();
    const { data: invite } = useSuspenseQuery(invitesQueries.details(code));

    return (
        <div className="flex grow flex-col items-center justify-center">
            <Card className="w-full max-w-sm">
                <div className="flex w-full items-center justify-center">
                    <Avatar size="lg" rounded="normal">
                        <AvatarImage
                            src={invite.house.logo ?? undefined}
                            alt={invite.house.name}
                        />

                        <AvatarFallback>
                            <HouseLineIcon />
                        </AvatarFallback>
                    </Avatar>
                </div>

                <CardHeader>
                    <CardTitle className="text-center">
                        {invite.house.name}
                    </CardTitle>
                    <CardDescription className="text-center">
                        You have been invited to join {invite.house.name}
                    </CardDescription>
                </CardHeader>

                <CardFooter className="flex flex-col gap-1">
                    <Button className="w-full">Accept invite</Button>
                    <Button variant="outline" className="w-full">
                        No thanks
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/invite/$code')({
    staticData: { showNavbar: false },
    component: RouteComponent,
    loader: async ({ context, params }) => {
        const invite = await context.queryClient.ensureQueryData(
            invitesQueries.details(params.code),
        );

        if (!invite) throw notFound();

        return { invite };
    },
});
