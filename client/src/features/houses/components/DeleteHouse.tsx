import { router } from '@/main';
import { toast } from 'sonner';
import { housesHooks } from '../hooks/houses.hooks.ts';

import {
    SettingButton,
    SettingContent,
} from '@/components/common/Settings.tsx';
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
import { Spinner } from '@/components/ui/spinner';
import { TrashIcon, WarningIcon } from '@phosphor-icons/react';

import type { House } from '../types/houses.types.ts';

interface Props {
    id: House['id'];
}

export const DeleteHouse = ({ id }: Props) => {
    const { mutateAsync: deleteHouse, isPending: isDeletingHouse } =
        housesHooks.useDelete();

    const onSubmit = async (houseId: typeof id) => {
        toast.promise(deleteHouse(houseId), {
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
                <SettingButton variant="destructive" disabled={isDeletingHouse}>
                    <SettingContent
                        title="Delete house"
                        icon={<TrashIcon />}
                        iconEnd={isDeletingHouse && <Spinner />}
                    />
                </SettingButton>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <WarningIcon />
                    </AlertDialogMedia>

                    <AlertDialogTitle>Delete house?</AlertDialogTitle>

                    <AlertDialogDescription>
                        This will permanently delete this house and all data
                        will be lost.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        variant="destructive"
                        onClick={() => onSubmit(id)}
                        disabled={isDeletingHouse}
                    >
                        {isDeletingHouse ? (
                            <>
                                <Spinner />
                                Deleting house...
                            </>
                        ) : (
                            <>
                                <TrashIcon />
                                Delete house
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
