import { Avatar, AvatarFallback, AvatarLabel } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { PlusIcon } from '@phosphor-icons/react';
import { CreateHouseForm } from './CreateHouseForm';

import type { ComponentProps } from 'react';

export const CreateHouse = ({ ...props }: ComponentProps<'button'>) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create House</DialogTitle>
                    <DialogDescription>
                        This will be your shared space
                    </DialogDescription>
                </DialogHeader>

                <CreateHouseForm />
            </DialogContent>
        </Dialog>
    );
};
