import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks';
import { CreateHouseDialog, HouseSelect } from '@/features/houses/components';
import { GearSixIcon } from '@phosphor-icons/react';
import { createFileRoute, Link } from '@tanstack/react-router';

const Index = () => {
    const { house } = useAuth();

    return (
        <div className="flex grow flex-col items-center justify-center gap-8">
            <div className="flex w-full max-w-3xl flex-wrap justify-center gap-2 p-8">
                <HouseSelect />

                {house.list.length < 5 && <CreateHouseDialog />}
            </div>

            {house.list.length > 0 && (
                <Button variant="outline" asChild>
                    <Link to="/manage-houses">
                        <GearSixIcon />
                        Manage Houses
                    </Link>
                </Button>
            )}
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/')({
    staticData: { showNavbar: false },
    component: Index,
});
