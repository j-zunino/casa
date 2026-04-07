import { handleSignOut } from '@/modules/auth';
import { SignOutIcon, UserIcon } from '@phosphor-icons/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './dropdown-menu';
import type { User } from '@/modules/auth';

interface Props {
    user: User;
}

export const DropdownAvatar = ({ user }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="rounded-full">
                    <Avatar size="sm">
                        <AvatarImage
                            src={user.image ?? undefined}
                            alt={user.name}
                        />
                        <AvatarFallback>
                            <UserIcon weight="bold" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
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
