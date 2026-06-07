import { invitesQueries } from '@/features/invites/queries';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ShareInviteLink } from '@/features/invites/components';
import { invitesHooks } from '@/features/invites/hooks';
import { DotsThreeIcon, PlusIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';

const RouteComponent = () => {
    const { slug } = Route.useParams();
    const createInvite = invitesHooks.useCreateInvite(slug);
    const { data: invites } = useSuspenseQuery(invitesQueries.all(slug));

    console.log(invites);

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex w-full justify-between">
                <h2>Active invite links</h2>
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
                        <ShareInviteLink
                            inviteCode={createInvite.data?.code}
                            isPending={createInvite.isPending}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {/* <TableHead>Inviter</TableHead> */}
                        <TableHead>Invite code</TableHead>
                        <TableHead className="text-center">Uses</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* TODO:FIX: 'invite' is type any */}
                    {/* TODO: Show inviter name and profile picture */}
                    {invites.map((invite) => (
                        <TableRow key={invite.id}>
                            <TableCell>{invite.code}</TableCell>
                            <TableCell className="text-center">
                                {invite.useCount}
                            </TableCell>
                            <TableCell className="text-center">
                                {invite.status}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8"
                                        >
                                            <DotsThreeIcon />
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem variant="destructive">
                                            Revoke
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
