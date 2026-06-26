import { cn } from "@/lib/utils";

import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../ui/item";

import type { LinkProps } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

interface SettingsLinkProps extends LinkProps {
    variant?: ComponentProps<typeof Item>["variant"];
}
interface SettingsButtonProps extends ComponentProps<"button"> {
    variant?: ComponentProps<typeof Button>["variant"];
}

interface SettingContentProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    iconEnd?: ReactNode;
}

export const Settings = ({ ...props }: ComponentProps<"div">) => {
    return <div className="flex flex-col gap-4 py-4 text-sm" {...props} />;
};

export const SettingsHeader = ({
    className,
    ...props
}: ComponentProps<"div">) => {
    return (
        <div
            className={cn("grid auto-rows-min items-start gap-1", className)}
            {...props}
        />
    );
};

export const SettingsTitle = ({
    className,
    ...props
}: ComponentProps<"h2">) => {
    return (
        <h2
            className={cn(
                "font-heading text-base leading-normal font-medium",
                className,
            )}
            {...props}
        />
    );
};

export const SettingsDescription = ({
    className,
    ...props
}: ComponentProps<"p">) => {
    return (
        <p
            className={cn(
                "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
                className,
            )}
            {...props}
        />
    );
};

export const SettingsGroup = ({
    className,
    ...props
}: ComponentProps<"div">) => {
    return (
        <div
            data-slot="field-group"
            className={cn("flex w-full flex-col gap-2.5", className)}
            {...props}
        />
    );
};

export const SettingsSet = ({ className, ...props }: ComponentProps<"div">) => {
    return (
        <div
            data-slot="field-group"
            className={cn("flex flex-col gap-1.5", className)}
            {...props}
        />
    );
};

export const SettingLink = ({
    variant = "outline",
    ...props
}: SettingsLinkProps) => {
    return (
        <Item asChild variant={variant}>
            <Link {...props} />
        </Item>
    );
};

// TODO:FIX: Destructive variant doesn't change ring
export const SettingButton = ({
    variant = "outline",
    ...props
}: SettingsButtonProps) => {
    return (
        <Item asChild variant={variant === "outline" ? "outline" : "default"}>
            <Button className="h-auto" variant={variant} {...props} />
        </Item>
    );
};

export const SettingContent = ({
    title,
    description,
    icon,
    iconEnd,
}: SettingContentProps) => {
    return (
        <>
            {icon && <ItemMedia>{icon}</ItemMedia>}

            <ItemContent>
                <ItemTitle>{title}</ItemTitle>

                {description && (
                    <ItemDescription>{description}</ItemDescription>
                )}
            </ItemContent>

            {iconEnd && <ItemMedia>{iconEnd}</ItemMedia>}
        </>
    );
};
