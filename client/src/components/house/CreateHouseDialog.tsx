import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { CreateHouse } from './CreateHouse';
import { CreateHouseForm } from './CreateHouseForm';

export const CreateHouseDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CreateHouse />
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
