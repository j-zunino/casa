import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

export const Profile = ({ className, ...props }: ComponentProps<"div">) => {
    return (
        <div
            className={cn("flex items-center gap-1.5", className)}
            {...props}
        />
    );
};
