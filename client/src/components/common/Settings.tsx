import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '../ui/item';

import type { LinkProps } from '@tanstack/react-router';
import type { ComponentProps, ReactNode } from 'react';

interface SettingsLinkProps extends LinkProps {
    variant?: ComponentProps<typeof Item>['variant'];
    children: ReactNode;
}
interface SettingsButtonProps extends ComponentProps<'button'> {
    variant?: ComponentProps<typeof Button>['variant'];
    children: ReactNode;
}

interface SettingContentProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    iconEnd?: ReactNode;
}

export const Settings = ({ ...props }: ComponentProps<'div'>) => {
    return (
        <div
            className="mx-auto flex w-full max-w-xl flex-col gap-1.5"
            {...props}
        />
    );
};

export const SettingLink = ({
    variant = 'outline',
    children,
    ...props
}: SettingsLinkProps) => {
    return (
        <Item asChild variant={variant}>
            <Link {...props}>{children}</Link>
        </Item>
    );
};

export const SettingButton = ({
    variant = 'outline',
    children,
    ...props
}: SettingsButtonProps) => {
    return (
        <Item asChild variant={variant === 'outline' ? 'outline' : 'default'}>
            <Button className="h-auto" variant={variant} {...props}>
                {children}
            </Button>
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
