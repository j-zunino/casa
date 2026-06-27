import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from "@/components/ui/avatar";
import { UserIcon } from "@phosphor-icons/react";

import type { User } from "@/features/auth/types";
import type { Member } from "better-auth/client/plugins";
import { RoleBadge } from "./RoleBadge";

interface Props {
    name: User["name"];
    image: User["image"];
    role?: Member["role"];
}

export const MemberAvatar = ({ name, image, role }: Props) => {
    return (
        <div className="flex items-center gap-1.5">
            <Avatar size="sm">
                <AvatarImage src={image ?? undefined} alt={name} />
                <AvatarFallback>
                    <UserIcon />
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-wrap gap-x-1.5">
                <AvatarLabel>{name}</AvatarLabel>
                {role && <RoleBadge role={role} />}
            </div>
        </div>
    );
};
