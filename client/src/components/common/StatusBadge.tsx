import { Badge, badgeVariants } from "../ui/badge";

import type { InvitationStatus } from "@casa/types";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const inviteStatus: Record<
    InvitationStatus,
    {
        label: string;
        variant: VariantProps<typeof badgeVariants>["variant"];
        className: string;
    }
> = {
    active: {
        label: "Active",
        variant: "default",
        className: "text-primary bg-primary/20",
    },
    expired: {
        label: "Expired",
        variant: "secondary",
        className: "text-muted-foreground",
    },
    revoked: {
        label: "Revoked",
        variant: "destructive",
        className: "",
    },
};

export const StatusBadge = ({
    status = "active",
    ...props
}: ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & {
        status: InvitationStatus;
    }) => {
    return (
        <Badge
            variant={inviteStatus[status].variant}
            className={inviteStatus[status].className}
            {...props}
        >
            {inviteStatus[status].label}
        </Badge>
    );
};
