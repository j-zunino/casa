import { MemberAvatar } from "@/components/common/MemberAvatar";
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
                                {member.user.email.length < 30 ? (
                                    member.user.email
                                ) : (
                                    <Tooltip>
                                        <TooltipTrigger className="w-[30ch] truncate text-left select-text">
                                            {member.user.email}
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            {member.user.email}
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                {member.role}
                            </TableCell>
                            <TableCell className="text-right">
                                <MemberDropdown />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
