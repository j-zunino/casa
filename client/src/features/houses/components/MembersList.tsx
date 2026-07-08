import { Profile, ProfileAvatar } from "@/components/common/MemberAvatar";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Truncate } from "@/components/common/Truncate";
import {
    Card,
    CardAction,
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
import { MemberDropdown } from "./MemberDropdown";

import type { ApiPagination } from "@casa/types";
import type { Member } from "../types";

interface Props {
    members: Member[];
    pagination: ApiPagination;
}

// TODO: Only show actions for owners/admins, needs to implement house role checking
export const MembersList = ({ members, pagination }: Props) => {
    return (
        <>
            <Table className="hidden sm:table">
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((member: Member) => (
                        <TableRow key={member.id}>
                            <TableCell>
                                <Profile>
                                    <ProfileAvatar
                                        src={member.user.image}
                                        alt={member.user.name}
                                    />

                                    <Truncate
                                        className="max-w-30"
                                        tooltip={member.user.name}
                                    >
                                        {member.user.name}
                                    </Truncate>
                                </Profile>
                            </TableCell>
                            <TableCell>
                                <Truncate
                                    className="block max-w-40"
                                    tooltip={member.user.email}
                                >
                                    {member.user.email}
                                </Truncate>
                            </TableCell>
                            <TableCell className="text-center">
                                <RoleBadge role={member.role} />
                            </TableCell>
                            <TableCell className="text-right">
                                <MemberDropdown />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {members.map((member: Member) => (
                <Card size="sm" className="sm:hidden" key={member.id}>
                    <CardHeader>
                        <CardTitle className="min-w-0">
                            <Profile>
                                <ProfileAvatar
                                    src={member.user.image}
                                    alt={member.user.name}
                                />

                                {/* NOTE: Maybe flex-wrap name and badge with min-w-0 */}
                                <Truncate
                                    className="block"
                                    tooltip={member.user.name}
                                >
                                    {member.user.name}
                                </Truncate>

                                <RoleBadge role={member.role} />
                            </Profile>
                        </CardTitle>
                        <CardDescription className="min-w-0">
                            <Truncate
                                className="block"
                                tooltip={member.user.email}
                            >
                                {member.user.email}
                            </Truncate>
                        </CardDescription>
                        <CardAction>
                            <MemberDropdown />
                        </CardAction>
                    </CardHeader>
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
