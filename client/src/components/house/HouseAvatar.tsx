import { Avatar as AvatarPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const HouseAvatar = ({
    className,
    ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {}) => {
    return (
        <AvatarPrimitive.Root
            data-slot="house-avatar"
            className={cn(
                'focus-ring hover-ring flex size-30 shrink-0 select-none',
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
            className={cn('aspect-square size-full object-cover', className)}
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
                'flex size-full items-center justify-center bg-muted text-2xl text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
};
