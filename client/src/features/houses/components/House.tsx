import { cn } from "@/lib/utils";

import { Link } from "@tanstack/react-router";
import { Slot } from "radix-ui";

import type { LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export const House = ({
    className,
    asChild = false,
    ...props
}: ComponentProps<"a"> & LinkProps & { asChild?: boolean }) => {
    const Comp = asChild ? Slot.Root : Link;
    return (
        <Comp
            to="/"
            data-slot="house"
            className={cn(
                "group relative flex w-30 flex-col gap-1.5 rounded-md transition outline-none select-none",
                className,
            )}
            {...props}
        />
    );
};

export const HouseLabel = ({ ...props }: ComponentProps<"span">) => {
    return (
        <span
            className="truncate text-center text-sm font-bold text-wrap"
            {...props}
        />
    );
};
