import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Avatar({
    className,
    size = "default",
    rounded = "full",
    ring = false,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
    size?: "default" | "sm" | "lg";
    rounded?: "normal" | "full";
    ring?: boolean;
}) {
    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            data-size={size}
            data-ring={ring}
            data-rounded={rounded}
            className={cn(
                // NOTE: removed 'relative', it messes up the z-index
                "group/avatar flex size-8 shrink-0 select-none",
                "data-[size=lg]:size-30 data-[size=sm]:size-6",
                "data-[rounded=full]:rounded-full data-[rounded=normal]:rounded-md ",
                className,
            )}
            {...props}
        />
    );
}

function AvatarImage({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            data-slot="avatar-image"
            className={cn(
                "aspect-square size-full object-cover",
                "group-data-[rounded=full]/avatar:rounded-full group-data-[rounded=normal]/avatar:rounded-md",
                className,
            )}
            {...props}
        />
    );
}

function AvatarFallback({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className={cn(
                "flex size-full items-center justify-center bg-muted text-sm text-muted-foreground",
                "group-data-[size=lg]/avatar:text-2xl group-data-[size=sm]/avatar:text-xs",
                "group-data-[rounded=full]/avatar:rounded-full group-data-[rounded=normal]/avatar:rounded-md",
                className,
            )}
            {...props}
        />
    );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            data-slot="avatar-badge"
            className={cn(
                "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
                "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
                "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
                "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
                "group-data-[rounded=full]/avatar:rounded-full group-data-[rounded=normal]/avatar:rounded-md",
                className,
            )}
            {...props}
        />
    );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="avatar-group"
            className={cn(
                "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
                className,
            )}
            {...props}
        />
    );
}

function AvatarGroupCount({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="avatar-group-count"
            className={cn(
                "relative flex size-8 shrink-0 items-center justify-center bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
                "group-data-[rounded=full]/avatar:rounded-full group-data-[rounded=normal]/avatar:rounded-md",
                className,
            )}
            {...props}
        />
    );
}

function AvatarLabel({
    className,
    children,
    ...props
}: React.ComponentProps<"p">) {
    return (
        <p
            className={cn(
                "block truncate text-center text-sm font-bold",
                className,
            )}
            {...props}
        >
            {children}
        </p>
    );
}

function AvatarEntity({
    fallback,
    src,
    alt,
    children,
    ...props
}: { fallback: React.ReactNode } & React.ComponentProps<typeof AvatarImage> &
    React.ComponentProps<typeof Avatar>) {
    return (
        <Avatar {...props}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
            {children}
        </Avatar>
    );
}

export {
    Avatar,
    AvatarImage,
    AvatarFallback,
    AvatarLabel,
    AvatarGroup,
    AvatarGroupCount,
    AvatarBadge,
    AvatarEntity,
};
