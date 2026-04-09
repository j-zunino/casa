import { CreateHouseForm, HouseSelect } from '@/components/house';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { setActiveHouse, type House } from '@/modules/auth';
import { createFileRoute, useRouteContext } from '@tanstack/react-router';

const Index = () => {
    const { house } = useRouteContext({ from: '__root__' });

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-wrap justify-center gap-2 p-2">
                {house.list?.map((h: House) => (
                    <HouseSelect
                        key={h.id}
                        name={h.name}
                        onClick={() => setActiveHouse(h.id, h.slug)}
                    />
                ))}

                <Dialog>
                    <DialogTrigger asChild>
                        <HouseSelect name="Add one" />
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
