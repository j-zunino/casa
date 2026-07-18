import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { housesHooks } from "../hooks";
import { housesQueries } from "../queries";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DotsThreeIcon,
    ShieldIcon,
    UserIcon,
    UserMinusIcon,
} from "@phosphor-icons/react";

import type { House, Member } from "../types";

interface Props {
    member: Member;
    slug: House["slug"];
}

export const MemberDropdown = ({ member, slug }: Props) => {
    const { mutateAsync: updateRole } = housesHooks.useUpdateRole(slug);
    const { mutateAsync: kickMember } = housesHooks.useRemoveMember(slug);
    const { data: permissions } = useSuspenseQuery(
        housesQueries.permissions(slug),
    );

    const canUpdate = permissions.member?.includes("update");
    const canKick = permissions.member?.includes("delete");
    const isOwner = member?.role === "owner";

    const onRoleUpdate = (role: Member["role"]) => {
        toast.promise(
            updateRole({
                memberId: member.id,
                role,
                organizationId: member.organizationId,
            }),
            {
                success: "Role updated successfully!",
                error: (error) => error.message ?? "Failed to update role",
            },
        );
    };

    const onKickMember = () => {
        toast.promise(
            kickMember({
                memberIdOrEmail: member.id,
                organizationId: member.organizationId,
            }),
            {
                success: "Member kicked successfully!",
                error: (error) => error.message ?? "Failed to kick member",
            },
        );
    };

    if (isOwner || (!canKick && !canUpdate)) {
        return (
            <Button variant="ghost" size="icon" disabled={true}>
                <DotsThreeIcon />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <DotsThreeIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-fit">
                {canUpdate && (
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    value={member.role}
                                    onValueChange={(newRole) =>
                                        onRoleUpdate(newRole)
                                    }
                                >
                                    <DropdownMenuRadioItem value="admin">
                                        <ShieldIcon />
                                        Admin
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="member">
                                        <UserIcon />
                                        Member
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                )}

                {canUpdate && canKick && <DropdownMenuSeparator />}

                {canKick && (
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={onKickMember}
                    >
                        <UserMinusIcon />
                        Kick member
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
