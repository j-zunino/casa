import { MemberAvatar } from "@/components/common/MemberAvatar";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { InviteDropdown } from "./InviteDropdown";

import { StatusBadge } from "@/components/common/StatusBadge";
import type { House } from "@/features/houses/types";
import type { ApiPagination } from "@casa/types";

interface Props {
    // TODO: Type invites
    invites: any;
    pagination: ApiPagination;
    slug: House["slug"];
}

export const InvitesList = ({ invites, pagination, slug }: Props) => {
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
                        <TableRow
                            key={invite.id}
                            className={`${invite.status !== "active" && "pointer-events-none opacity-50"}`}
                        >
                            <TableCell>
                                <MemberAvatar
                                    name={invite.inviter.name}
                                    image={invite.inviter.image}
                                />
                            </TableCell>
                            <TableCell>{invite.code}</TableCell>
                            <TableCell className="text-center">
                                {invite.useCount}
                                {invite.maxUses && ` of ${invite.maxUses}`}
                            </TableCell>
                            <TableCell className="text-center">
                                <StatusBadge status={invite.status} />
                            </TableCell>
                            <TableCell className="text-right">
                                <InviteDropdown
                                    inviteCode={invite.code}
                                    slug={slug}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {invites.map((invite: any) => (
                <Card
                    className={`sm:hidden ${invite.status !== "active" && "pointer-events-none opacity-50"}`}
                    size="sm"
                    key={invite.id}
                >
                    <CardHeader>
                        <CardTitle className="flex gap-1.5">
                            {invite.code}
                            <StatusBadge status={invite.status} />
                        </CardTitle>
                        <CardDescription>
                            Uses: {invite.useCount}
                            {invite.maxUses && ` of ${invite.maxUses}`}
                        </CardDescription>
                        <CardAction>
                            <InviteDropdown
                                inviteCode={invite.code}
                                slug={slug}
                            />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <MemberAvatar
                            name={invite.inviter.name}
                            image={invite.inviter.image}
                        />
                    </CardContent>
                </Card>
            ))}

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                    {" — "}
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
