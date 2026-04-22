import { DeleteHouseAlert } from '@/components/house';
import { NoActiveHouse } from '@/components/shared';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    CaretLeftIcon,
    CaretRightIcon,
    HouseLineIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router';

const RouteComponent = () => {
    const { house } = useRouteContext({ from: '__root__' });

    if (!house || !house.active) {
        return <NoActiveHouse />;
    }

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <Button variant="ghost" asChild>
                        <Link to="/account" className="flex items-center">
                            <CaretLeftIcon />
                            Back
                        </Link>
                    </Button>
                </div>

                <div className="w-30 rounded-md transition outline-none select-none">
                    <Avatar size="lg" rounded="normal">
                        <AvatarImage
                            src={house.active.logo ?? undefined}
                            alt={house.active.name}
                        />

                        <AvatarFallback>
                            <HouseLineIcon />
                        </AvatarFallback>
                    </Avatar>

                    <AvatarLabel>{house.active.name}</AvatarLabel>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="justify-between"
                    >
                        <Link to=".">
                            <span className="flex items-center gap-2">
                                <UserIcon />
                                Members
                            </span>

                            <CaretRightIcon />
                        </Link>
                    </Button>

                    <DeleteHouseAlert houseId={house.active.id} />
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/houses/$slug')({
    staticData: { homePath: '/h/$slug' },
    component: RouteComponent,
});
