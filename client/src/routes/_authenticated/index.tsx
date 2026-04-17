import { CreateHouse, CreateHouseForm, HouseSelect } from '@/components/house';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { createFileRoute, useRouteContext } from '@tanstack/react-router';

const Index = () => {
    const { house } = useRouteContext({ from: '__root__' });

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 p-8">
                <HouseSelect />

                {house.list.length < 5 && (
                    <Dialog>
                        <DialogTrigger>
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
                )}
            </div>

            <Button onClick={() => {}} variant="outline">
                Manage House
            </Button>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/')({
    component: Index,
});
