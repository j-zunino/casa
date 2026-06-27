import { Badge, badgeVariants } from "../ui/badge";

import type { Member } from "better-auth/client/plugins";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const roles: Record<
    Member["role"],
    {
        label: string;
        variant: VariantProps<typeof badgeVariants>["variant"];
        className: string;
    }
> = {
    owner: {
        label: "Owner",
        variant: "destructive",
        className: "",
    },
    admin: {
        label: "Admin",
        variant: "secondary",
        className: "",
    },
    member: {
        label: "Member",
        variant: "outline",
        className: "text-muted-foreground",
    },
};

export const RoleBadge = ({
    role = "member",
    ...props
}: ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & {
        role: Member["role"];
    }) => {
    return (
        <Badge
            variant={roles[role].variant}
            className={roles[role].className}
            {...props}
        >
            {roles[role].label}
        </Badge>
    );
};
