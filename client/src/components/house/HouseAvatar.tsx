import { Avatar as AvatarPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const HouseAvatar = ({
    className,
    size = 'default',
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
    size?: 'default' | 'sm';
}) => {
    return (
        <AvatarPrimitive.Root
            data-slot="house-avatar"
            data-size={size}
            className={cn(
                'focus-ring hover-ring group/house-avatar flex size-30 shrink-0 rounded-md select-none data-[size=sm]:size-5',
                className,
            )}
            {...props}
        />
    );
};

export const HouseAvatarImage = ({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
    return (
        <AvatarPrimitive.Image
            data-slot="house-avatar-image"
            className={cn(
                'aspect-square size-full rounded-md object-cover',
                className,
            )}
            {...props}
        />
    );
};

export const HouseAvatarFallback = ({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
    return (
        <AvatarPrimitive.Fallback
            data-slot="house-avatar-fallback"
            className={cn(
                'flex size-full items-center justify-center rounded-md bg-muted text-2xl text-muted-foreground group-data-[size=sm]/house-avatar:text-xs',
                className,
            )}
            {...props}
        />
    );
};
