import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { handleSignOut, setActiveHouse } from '@/modules/auth';
import { PencilSimpleIcon, SignOutIcon, UserIcon } from '@phosphor-icons/react';
import { useRouteContext } from '@tanstack/react-router';

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
                            <UserIcon weight="bold" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-auto">
                {house.list.map((h) => (
                    <DropdownMenuItem
                        key={h.id}
                        onSelect={() => setActiveHouse(h.id, h.slug)}
                    >
                        {h.name}
                    </DropdownMenuItem>
                ))}

                <DropdownMenuItem>
                    <PencilSimpleIcon weight="bold" />
                    Manage Houses
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <UserIcon weight="bold" />
                    Account
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onSelect={handleSignOut}
                    variant="destructive"
                >
                    <SignOutIcon weight="bold" />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
