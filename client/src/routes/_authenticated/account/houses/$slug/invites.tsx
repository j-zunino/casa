import { invitesHooks } from '@/features/invites/hooks';
import { invitesQueries } from '@/features/invites/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { InvitesList, CreateInviteLink } from '@/features/invites/components';
import { PlusIcon } from '@phosphor-icons/react';

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const createInvite = invitesHooks.useCreateInvite(slug);
    const { data: invites } = useSuspenseQuery(invitesQueries.all(slug));

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex w-full justify-between">
                <h2 className="font-heading text-base font-medium">
                    Active invite links
                </h2>

                <Dialog
                    onOpenChange={(open) => {
                        if (open && !createInvite.data) {
                            createInvite.mutate();
                        }
                    }}
                >
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <PlusIcon />
                            Create invite
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateInviteLink
                            inviteCode={createInvite.data?.code}
                            isPending={createInvite.isPending}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <InvitesList invites={invites} />
        </div>
    );
};

export const Route = createFileRoute(
    '/_authenticated/account/houses/$slug/invites',
)({
    component: RouteComponent,
    loader: async ({ context, params }) => {
        await context.queryClient.ensureQueryData(
            invitesQueries.all(params.slug),
        );
    },
});
