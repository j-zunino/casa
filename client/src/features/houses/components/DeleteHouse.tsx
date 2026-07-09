import { router } from "@/main";
import { toast } from "sonner";
import { housesHooks } from "../hooks";

import { SettingsButton, SettingsContent } from "@/components/common/Settings";
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
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { SealWarningIcon, TrashIcon } from "@phosphor-icons/react";

import type { House } from "../types";

interface Props {
    id: House["id"];
}

export const DeleteHouse = ({ id }: Props) => {
    const { mutateAsync: deleteHouse, isPending: isDeletingHouse } =
        housesHooks.useDelete();

    const onSubmit = async (houseId: typeof id) => {
        toast.promise(deleteHouse(houseId), {
            loading: "Deleting house...",
            success: () => {
                router.navigate({
                    to: "/",
                });

                return "House deleted successfully!";
            },
            error: (err) => err.message,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SettingsButton
                    variant="destructive"
                    disabled={isDeletingHouse}
                >
                    <SettingsContent
                        title="Delete house"
                        icon={<TrashIcon />}
                        iconEnd={isDeletingHouse && <Spinner />}
                    />
                </SettingsButton>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <SealWarningIcon />
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
