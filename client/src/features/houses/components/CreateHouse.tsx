import { AvatarEntity } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@phosphor-icons/react";
import { CreateHouseForm } from "./CreateHouseForm";
import { House, HouseLabel } from "./House";

export const CreateHouse = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <House asChild>
                    <button>
                        <AvatarEntity
                            size="lg"
                            rounded="normal"
                            ring={true}
                            fallback={<PlusIcon />}
                        />

                        <HouseLabel>Create</HouseLabel>
                    </button>
                </House>
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
