import {
    PaginationControls,
    PaginationTotal,
} from "@/components/common/Pagination";
import { Profile } from "@/components/common/Profile";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Truncate } from "@/components/common/Truncate";
import { AvatarEntity } from "@/components/ui/avatar";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserIcon } from "@phosphor-icons/react";
import { InviteDropdown } from "./InviteDropdown";

import type { House } from "@/features/houses/types";
import type { ApiPagination, Invitation } from "@casa/types";

interface Props {
    invites: Invitation[];
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
                    {invites.map((invite: Invitation) => (
                        <TableRow
                            key={invite.id}
                            className={`${invite.status !== "active" && "pointer-events-none opacity-50"}`}
                        >
                            <TableCell>
                                <Profile>
                                    <AvatarEntity
                                        size="sm"
                                        src={invite.inviter.image}
                                        alt={invite.inviter.name}
                                        fallback={<UserIcon />}
                                    />

                                    <Truncate
                                        className="max-w-30"
                                        tooltip={invite.inviter.name}
                                    >
                                        {invite.inviter.name}
                                    </Truncate>
                                </Profile>
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

            {invites.map((invite: Invitation) => (
                <Card
                    className={`sm:hidden ${invite.status !== "active" && "pointer-events-none opacity-50"}`}
                    size="sm"
                    key={invite.id}
                >
                    <CardHeader>
                        <CardTitle className="flex flex-wrap gap-x-1.5">
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
                        <Profile>
                            <AvatarEntity
                                size="sm"
                                src={invite.inviter.image}
                                alt={invite.inviter.name}
                                fallback={<UserIcon />}
                            />

                            <Truncate
                                className="block"
                                tooltip={invite.inviter.name}
                            >
                                {invite.inviter.name}
                            </Truncate>
                        </Profile>
                    </CardContent>
                </Card>
            ))}

            <Pagination className="flex items-center justify-between">
                <PaginationTotal
                    page={pagination.page}
                    total={pagination.total}
                    totalPages={pagination.totalPages}
                />
                <PaginationControls
                    page={pagination.page}
                    hasPrevious={pagination.hasPrevious}
                    hasNext={pagination.hasNext}
                />
            </Pagination>
        </>
    );
};
