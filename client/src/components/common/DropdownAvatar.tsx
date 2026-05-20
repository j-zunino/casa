import { useAuth } from '@/features/auth/hooks';
import { handleSignOut } from '@/features/auth/services';
import { useHouses } from '@/features/houses/hooks';
import { setActiveHouse } from '@/features/houses/services';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    AvatarLabel,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    GearSixIcon,
    HouseLineIcon,
    SignOutIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { Spinner } from '../ui/spinner';

import type { House } from '@/features/houses/types';

export const DropdownAvatar = () => {
    const { auth } = useAuth();
    const { data: houses, isPending: isHousesPending } = useHouses.useAll();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar size="sm">
                        <AvatarImage
                            src={auth.user?.image ?? undefined}
                            alt={auth.user?.name}
                        />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-auto max-w-60 min-w-50"
            >
                {isHousesPending ? (
                    <DropdownMenuItem className="hover:bg-transparent!">
                        <Spinner />
                        Loading houses...
                    </DropdownMenuItem>
                ) : (
                    houses.map((h: House) => (
                        <DropdownMenuItem
                            key={h.id}
                            onClick={() => setActiveHouse(h.id, h.slug)}
                        >
                            <Avatar size="sm" rounded="normal">
                                <AvatarImage
                                    src={h.logo ?? undefined}
                                    alt={h.name}
                                />

                                <AvatarFallback>
                                    <HouseLineIcon />
                                </AvatarFallback>
                            </Avatar>

                            <AvatarLabel className="py-0">{h.name}</AvatarLabel>
                        </DropdownMenuItem>
                    ))
                )}

                <DropdownMenuItem asChild>
                    <Link to="/manage-houses">
                        <GearSixIcon />
                        Manage Houses
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link to="/account">
                        <UserIcon />
                        My account
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignOut} variant="destructive">
                    <SignOutIcon />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
