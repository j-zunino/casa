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

interface Props {
    name: string;
    avatar?: string;
}

export const DropdownAvatar = ({ name, avatar }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    {name}
                    <Avatar size="sm">
                        <AvatarImage src={avatar} alt={name} />
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
