import { createFileRoute } from '@tanstack/react-router';
import { CreateHouseForm, HouseSelectCard } from '../../components/house';
import { Button } from '../../components/ui';
import { Modal } from '../../components/ui/Modal';
import { authClient, setActiveHouse } from '../../modules/auth';
import { useModal } from '../../modules/modal';

const Index = () => {
    const createHouseModal = useModal();

    // TODO: Move to context
    const { data: orgs } = authClient.useListOrganizations();

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-wrap justify-center gap-2 p-2">
                {orgs?.map((org) => (
                    <HouseSelectCard
                        key={org.id}
                        name={org.name}
                        onClick={() => setActiveHouse(org.id, org.slug)}
                    />
                ))}

                <HouseSelectCard
                    name="Add one"
                    onClick={createHouseModal.open}
                />
            </div>

            <Button onClick={() => {}} variant="outline">
                Manage House
            </Button>

            <Modal
                ref={createHouseModal.ref}
                onClose={createHouseModal.close}
                title="Create House"
                description="This will be your shared space"
            >
                <CreateHouseForm />
            </Modal>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/')({
    component: Index,
});
