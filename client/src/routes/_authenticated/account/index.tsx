import { useAuth } from '@/features/auth/hooks';
import { housesQueries } from '@/features/houses/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { BackButton } from '@/components/common/BackButton';
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    CaretRightIcon,
    EnvelopeSimpleIcon,
    HouseLineIcon,
    PasswordIcon,
    TrashIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

import type { House } from '@/features/houses/types';

const RouteComponent = () => {
    const { auth } = useAuth();
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <BackButton />
                </div>

                <div className="rounded-md transition outline-none select-none">
                    <Avatar size="lg">
                        <AvatarImage
                            src={auth.user?.image ?? undefined}
                            alt={auth.user?.name}
                        />

                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>

                    <AvatarLabel>{auth.user?.name}</AvatarLabel>
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
                                <EnvelopeSimpleIcon />
                                Invitations
                            </span>

                            <CaretRightIcon />
                        </Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="justify-between"
                    >
                        <Link to=".">
                            <span className="flex items-center gap-2">
                                <PasswordIcon />
                                Update password
                            </span>

                            <CaretRightIcon />
                        </Link>
                    </Button>

                    {houses.length > 0 && (
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="justify-between"
                        >
                            <Link to=".">
                                <span className="flex items-center gap-2">
                                    <HouseLineIcon />
                                    Manage houses
                                </span>

                                <div className="flex items-center gap-2">
                                    <AvatarGroup>
                                        {houses.slice(0, 2).map((h: House) => (
                                            <Avatar
                                                key={h.id}
                                                size="sm"
                                                rounded="normal"
                                            >
                                                <AvatarImage
                                                    src={h.logo ?? undefined}
                                                    alt={h.name}
                                                />

                                                <AvatarFallback>
                                                    <HouseLineIcon />
                                                </AvatarFallback>
                                            </Avatar>
                                        ))}

                                        {houses.length > 2 && (
                                            <AvatarGroupCount>
                                                +{houses.length - 2}
                                            </AvatarGroupCount>
                                        )}
                                    </AvatarGroup>

                                    <CaretRightIcon />
                                </div>
                            </Link>
                        </Button>
                    )}

                    <Button disabled variant="destructive" size="lg">
                        <TrashIcon />
                        Delete account
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/account/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(housesQueries.all());
    },
});
