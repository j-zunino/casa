import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "@phosphor-icons/react";

import type { ComponentProps } from "react";

export const Profile = ({ className, ...props }: ComponentProps<"div">) => {
    return (
        <div
            className={cn("flex items-center gap-1.5", className)}
            {...props}
        />
    );
};

export const ProfileAvatar = ({
    size = "sm",
    src,
    alt,
    ...props
}: ComponentProps<typeof Avatar> & ComponentProps<typeof AvatarImage>) => {
    return (
        <Avatar size={size} {...props}>
            <AvatarImage src={src ?? undefined} alt={alt} />
            <AvatarFallback>
                <UserIcon />
            </AvatarFallback>
        </Avatar>
    );
};
