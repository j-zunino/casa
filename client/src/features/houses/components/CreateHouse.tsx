import { Avatar, AvatarFallback, AvatarLabel } from '@/components/ui/avatar';
import { PlusIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';

export const CreateHouse = ({ ...props }: ComponentProps<'button'>) => {
    return (
        <button
            className="group rounded-md transition outline-none select-none"
            {...props}
        >
            <Avatar size="lg" rounded="normal" ring={true}>
                <AvatarFallback className="bg-muted/30">
                    <PlusIcon />
                </AvatarFallback>
            </Avatar>

            <AvatarLabel>Create</AvatarLabel>
        </button>
    );
};
