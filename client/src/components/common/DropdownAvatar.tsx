import { authHooks } from '@/features/auth/hooks';
import { authQueries } from '@/features/auth/queries';
import { housesQueries } from '@/features/houses/queries';
import { useSuspenseQuery } from '@tanstack/react-query';

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

import type { House } from '@/features/houses/types';

export const DropdownAvatar = () => {
    const { data: session } = useSuspenseQuery(authQueries.session());
    const { data: houses } = useSuspenseQuery(housesQueries.all());

    const { mutate: signOut, isPending: isSigningOut } = authHooks.useSignOut();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar size="sm">
                        <AvatarImage
                            // TODO:FIX: 'session' is possibly undefined
                            src={session?.user.image ?? undefined}
                            alt={session?.user.name}
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
                {houses.map((h: House) => (
                    <DropdownMenuItem key={h.id} asChild>
                        <Link to="/h/$slug" params={{ slug: h.slug }}>
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
                        </Link>
                    </DropdownMenuItem>
                ))}

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

                <DropdownMenuItem
                    onClick={() => signOut()}
                    disabled={isSigningOut}
                    variant="destructive"
                >
                    <SignOutIcon />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
