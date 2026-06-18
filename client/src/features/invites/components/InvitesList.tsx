import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { InviteAvatar } from './InviteAvatar';
import { InviteDropdown } from './InviteDropdown';

interface Props {
    // TODO: Type invites
    invites: any;
}

// TODO: Add pagination
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
                                <InviteDropdown inviteCode={invite.code} />
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

                        <InviteDropdown inviteCode={invite.code} />
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
