import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
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

import type { ApiPagination } from '@casa/types';

interface Props {
    // TODO: Type invites
    invites: any;
    pagination: ApiPagination;
}

export const InvitesList = ({ invites, pagination }: Props) => {
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
                    {invites.map((invite: any) => (
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

            {invites.map((invite: any) => (
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

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                    {' — '}
                    {pagination.total} total
                </p>

                <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                        {pagination.hasPrevious && (
                            <PaginationItem>
                                <PaginationPrevious
                                    search={{ page: pagination.page - 1 }}
                                />
                            </PaginationItem>
                        )}

                        {pagination.hasNext && (
                            <PaginationItem>
                                <PaginationNext
                                    search={{ page: pagination.page + 1 }}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};
