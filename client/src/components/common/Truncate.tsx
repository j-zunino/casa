import { useIsTruncated } from "@/lib/hooks/isTruncated";
import { cn } from "@/lib/utils";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import type { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"span"> {
    children: ReactNode;
    tooltip: ReactNode;
}

export const Truncate = ({ children, tooltip, className, ...props }: Props) => {
    const { ref, isTruncated } = useIsTruncated<HTMLSpanElement>();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span
                    ref={ref}
                    className={cn("truncate", className)}
                    {...props}
                >
                    {children}
                </span>
            </TooltipTrigger>

            {isTruncated && <TooltipContent>{tooltip}</TooltipContent>}
        </Tooltip>
    );
};
