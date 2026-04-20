import {
    HouseAvatar,
    HouseAvatarFallback,
    HouseAvatarImage,
    HouseLabel,
} from '@/components/house';
import { NoActiveHouse } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { deleteHouse } from '@/modules/auth';
import {
    CaretLeftIcon,
    CaretRightIcon,
    HouseLineIcon,
    TrashIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router';

const RouteComponent = () => {
    const { house } = useRouteContext({ from: '__root__' });

    if (!house || !house.active) return <NoActiveHouse />;

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <Button variant="ghost">
                        <Link to=".." className="flex items-center">
                            <CaretLeftIcon />
                            Back
                        </Link>
                    </Button>
                </div>

                <div className="w-30 rounded-md transition outline-none select-none">
                    <HouseAvatar>
                        <HouseAvatarImage
                            src={house.active.logo ?? undefined}
                            alt={house.active.name}
                        />

                        <HouseAvatarFallback>
                            <HouseLineIcon />
                        </HouseAvatarFallback>
                    </HouseAvatar>

                    <HouseLabel label={house.active.name} />
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

                    <Button asChild size="lg" variant="destructive">
                        <Button onClick={() => deleteHouse(house.active?.id)}>
                            <TrashIcon />
                            Delete house
                        </Button>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/houses/$slug')({
    staticData: { homePath: '/h/$slug' },
    component: RouteComponent,
});
