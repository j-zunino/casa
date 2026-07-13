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
import { HouseLineIcon, SignOutIcon } from "@phosphor-icons/react";

// TODO: Add functionality
export const LeaveHouse = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SettingsButton variant="destructive">
                    <SettingsContent
                        title="Leave house"
                        icon={<SignOutIcon />}
                    />
                </SettingsButton>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia>
                        <HouseLineIcon />
                    </AlertDialogMedia>

                    <AlertDialogTitle>Leave house?</AlertDialogTitle>

                    <AlertDialogDescription>
                        You will lose access to this house and all the content
                        inside it.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction variant="destructive">
                        <SignOutIcon />
                        Leave house
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
