import { useAuth } from '@/features/auth/hooks';
import { createFileRoute } from '@tanstack/react-router';

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
    CaretLeftIcon,
    CaretRightIcon,
    EnvelopeSimpleIcon,
    HouseLineIcon,
    PasswordIcon,
    TrashIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

const RouteComponent = () => {
    const { auth, house } = useAuth();

    return (
        <div className="flex grow flex-col items-center p-8">
            <div className="flex w-full max-w-xl flex-col items-center justify-start gap-8">
                <div className="w-full justify-start">
                    <Button variant="ghost" asChild>
                        <Link to="/" className="flex items-center">
                            <CaretLeftIcon />
                            Back
                        </Link>
                    </Button>
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

                    {house.list.length > 0 && (
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
                                        {house.list.slice(0, 2).map((h) => (
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

                                        {house.list.length > 2 && (
                                            <AvatarGroupCount>
                                                +{house.list.length - 2}
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
});
