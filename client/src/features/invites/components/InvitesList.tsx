import { toast } from 'sonner';

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
    DropdownMenuSeparator,
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

interface CopyInviteProps {
    inviteCode: string;
}

interface ActionsProps {
    inviteCode: string;
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

// TODO: Replace string when 'invite' is typed
const CopyInvite = ({ inviteCode }: CopyInviteProps) => {
    const handleCopy = async () => {
        if (!inviteCode) return;

        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/${inviteCode}`,
            );
            toast.success('Copied to clipboard');
        } catch {
            toast.error('Failed to copy to clipboard');
        }
    };

    return (
        <DropdownMenuItem onClick={handleCopy}>
            <CopyIcon />
            Copy
        </DropdownMenuItem>
    );
};

const InviteActions = ({ inviteCode }: ActionsProps) => {
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

                <CopyInvite inviteCode={inviteCode} />

                <DropdownMenuSeparator />

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
                                <InviteActions inviteCode={invite.code} />
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

                        <InviteActions inviteCode={invite.code} />
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
