import { createFileRoute } from '@tanstack/react-router';
import { HouseSelectCard } from '../../components/house';
import { Button } from '../../components/ui';
import { authClient } from '../../modules/auth';

const Index = () => {
    // TODO: Move to context
    const { data: orgs } = authClient.useListOrganizations();

    // TODO: Show in Modal
    //     return (
    //         <AuthLayout
    //             title="Create House"
    //             description="This will be your shared space"
    //         >
    //             <CreateHouseForm />
    //         </AuthLayout>
    //     );
    // }

    return (
        <div className="flex items-center flex-col gap-8">
            <div className="flex flex-wrap gap-4 w-full justify-center p-2">
                {orgs?.map((org) => (
                    <HouseSelectCard
                        key={org.id}
                        name={org.name}
                        onClick={() => {}}
                    />
                ))}
                <HouseSelectCard name="Add one" onClick={() => {}} />
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
