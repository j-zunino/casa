import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from "@/components/ui/avatar";
import { UserIcon } from "@phosphor-icons/react";

import type { User } from "@/features/auth/types";

interface Props {
    name: User["name"];
    image: User["image"];
}

export const InviteAvatar = ({ name, image }: Props) => {
    return (
        <div className="flex gap-1.5">
            <Avatar size="sm">
                <AvatarImage src={image ?? undefined} alt={name} />
                <AvatarFallback>
                    <UserIcon />
                </AvatarFallback>
            </Avatar>

            <AvatarLabel>{name}</AvatarLabel>
        </div>
    );
};
