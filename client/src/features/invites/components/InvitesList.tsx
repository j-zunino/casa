import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import {
    CopyIcon,
    DotsThreeIcon,
    PencilIcon,
    ProhibitIcon,
    ShareNetworkIcon,
    UserIcon,
} from '@phosphor-icons/react';

import type { User } from '@/features/auth/types';

interface Props {
    // TODO: Type invites
    invites: any;
}

interface AvatarProps {
    name: User['name'];
    image: User['image'];
}

const InviteAvatar = ({ name, image }: AvatarProps) => {
    return (
        <div className="flex gap-1.5">
            <Avatar size="sm">
                <AvatarImage src={image ?? undefined} alt={name} />
                <AvatarFallback>
                    <UserIcon />
                </AvatarFallback>
            </Avatar>

            <p>{name}</p>
        </div>
    );
};

const InviteActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <DotsThreeIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <PencilIcon />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ShareNetworkIcon />
                    Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CopyIcon />
                    Copy
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                    <ProhibitIcon />
                    Revoke
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const InvitesList = ({ invites }: Props) => {
    return (
        <>
            <Table className="hidden sm:table">
                <TableHeader>
                    <TableRow>
                        <TableHead>Inviter</TableHead>
                        <TableHead>Invite code</TableHead>
                        <TableHead className="text-center">Uses</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* TODO:FIX: 'invite' is type any */}
                    {invites.map((invite) => (
                        <TableRow key={invite.id}>
                            <TableCell>
                                <InviteAvatar
                                    name={invite.inviter.name}
                                    image={invite.inviter.image}
                                />
                            </TableCell>
                            <TableCell>{invite.code}</TableCell>
                            <TableCell className="text-center">
                                {invite.useCount}
                            </TableCell>
                            <TableCell className="text-center">
                                {invite.status}
                            </TableCell>
                            <TableCell className="text-right">
                                <InviteActions />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {invites.map((invite) => (
                <Card className="sm:hidden" size="sm" key={invite.id}>
                    <CardHeader className="flex justify-between gap-1.5">
                        <div>
                            <CardTitle>{invite.code}</CardTitle>
                            <CardDescription>
                                Uses: {invite.useCount}
                            </CardDescription>
                        </div>

                        <InviteActions />
                    </CardHeader>
                    <CardContent>
                        <InviteAvatar
                            name={invite.inviter.name}
                            image={invite.inviter.image}
                        />
                    </CardContent>
                </Card>
            ))}
        </>
    );
};
