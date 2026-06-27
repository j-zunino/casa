import { MemberAvatar } from "@/components/common/MemberAvatar";
import { RoleBadge } from "@/components/common/RoleBadge";
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MemberDropdown } from "./MemberDropdown";

import type { ApiPagination } from "@casa/types";
import type { Member } from "../types";

interface Props {
    members: Member[];
    pagination: ApiPagination;
}

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
                                <MemberAvatar
                                    name={member.user.name}
                                    image={member.user.image}
                                />
                            </TableCell>
                            <TableCell>
                                {member.user.email.length < 25 ? (
                                    member.user.email
                                ) : (
                                    <Tooltip>
                                        <TooltipTrigger className="w-[25ch] truncate text-left select-text">
                                            {member.user.email}
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            {member.user.email}
                                        </TooltipContent>
                                    </Tooltip>
                                )}
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
                        <CardTitle>
                            <MemberAvatar
                                name={member.user.name}
                                image={member.user.image}
                                role={member.role}
                            />
                            <p className="sr-only">
                                User {member.user.name} information
                            </p>
                        </CardTitle>
                        <CardDescription className="truncate">
                            {member.user.email}
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
