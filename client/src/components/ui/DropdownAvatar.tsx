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
import { handleSignOut, setActiveHouse } from '@/modules/auth';
import {
    GearSixIcon,
    HouseLineIcon,
    SignOutIcon,
    UserIcon,
} from '@phosphor-icons/react';
import { Link, useRouteContext } from '@tanstack/react-router';

export const DropdownAvatar = () => {
    const { auth, house } = useRouteContext({ from: '__root__' });

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

            <DropdownMenuContent align="end" className="w-auto max-w-60">
                {house.list.map((h) => (
                    <DropdownMenuItem
                        key={h.id}
                        onSelect={() => setActiveHouse(h.id, h.slug)}
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
                    onSelect={handleSignOut}
                    variant="destructive"
                >
                    <SignOutIcon />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
