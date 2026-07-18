import {
    PaginationControls,
    PaginationTotal,
} from "@/components/common/Pagination";
import { Profile } from "@/components/common/Profile";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Truncate } from "@/components/common/Truncate";
import { AvatarEntity } from "@/components/ui/avatar";
import {
    Card,
    CardAction,
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
import { MemberDropdown } from "./MemberDropdown";

import type { ApiPagination } from "@casa/types";
import type { House, Member } from "../types";

interface Props {
    members: Member[];
    slug: House["slug"];
    pagination: ApiPagination;
}

// TODO: Only show actions for owners/admins, needs to implement house role checking
export const MembersList = ({ members, slug, pagination }: Props) => {
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
                                    <AvatarEntity
                                        size="sm"
                                        src={member.user.image}
                                        alt={member.user.name}
                                        fallback={<UserIcon />}
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
                                <MemberDropdown member={member} slug={slug} />
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
                                <AvatarEntity
                                    size="sm"
                                    src={member.user.image}
                                    alt={member.user.name}
                                    fallback={<UserIcon />}
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
                            <MemberDropdown member={member} slug={slug} />
                        </CardAction>
                    </CardHeader>
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
