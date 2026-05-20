import { router } from '@/main';
import { toast } from 'sonner';
import { useHouses } from '../hooks/useHouses.ts';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { TrashIcon, XIcon } from '@phosphor-icons/react';

import type { House } from '../types/houses.types.ts';

interface Props {
    id: House['id'];
}

export const DeleteHouse = ({ id }: Props) => {
    const { mutateAsync, isPending } = useHouses.useDelete();

    const onSubmit = async (houseId: typeof id) => {
        toast.promise(mutateAsync(houseId), {
            loading: 'Deleting house...',
            success: () => {
                router.navigate({
                    to: '/',
                });

                return 'House deleted successfully!';
            },
            error: (err) => err.message,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="lg" variant="destructive" disabled={isPending}>
                    <TrashIcon />
                    Delete house
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                        <TrashIcon />
                    </AlertDialogMedia>

                    <AlertDialogTitle>Delete house?</AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete this house and all data
                        will be lost.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        <XIcon />
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={() => onSubmit(id)}
                        disabled={isPending}
                    >
                        <TrashIcon />
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
