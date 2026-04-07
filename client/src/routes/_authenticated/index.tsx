import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { createFileRoute } from '@tanstack/react-router';
import { CreateHouseForm, HouseSelect } from '@/components/house';
import { authClient, setActiveHouse } from '@/modules/auth';

const Index = () => {
    // TODO: Move to context
    const { data: orgs } = authClient.useListOrganizations();

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-wrap justify-center gap-2 p-2">
                {orgs?.map((org) => (
                    <HouseSelect
                        key={org.id}
                        name={org.name}
                        onClick={() => setActiveHouse(org.id, org.slug)}
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
