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
import type { House } from '@/features/auth/types';
import { TrashIcon, XIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { handleDeleteHouse } from '../services/houses.service.ts';

interface Props {
    houseId: House['id'];
}

export const DeleteHouseAlert = ({ houseId }: Props) => {
    const handleDelete = (id: typeof houseId) => {
        toast.promise(handleDeleteHouse(id), {
            loading: 'Deleting house...',
            success: 'House deleted successfully!',
            error: (err) => err.message,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="lg" variant="destructive">
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
                        onClick={() => handleDelete(houseId)}
                    >
                        <TrashIcon />
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
