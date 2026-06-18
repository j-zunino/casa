import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { CopyIcon, DotsThreeIcon, ProhibitIcon } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface Props {
    inviteCode: string;
}

const CopyInviteItem = ({ inviteCode }: Props) => {
    const handleCopy = async () => {
        if (!inviteCode) return;

        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/${inviteCode}`,
            );
            toast.success('Copied to clipboard');
        } catch {
            toast.error('Failed to copy to clipboard');
        }
    };

    return (
        <DropdownMenuItem onClick={handleCopy}>
            <CopyIcon />
            Copy
        </DropdownMenuItem>
    );
};

const RevokeInviteItem = () => {
    return (
        <DropdownMenuItem variant="destructive">
            <ProhibitIcon />
            Revoke
        </DropdownMenuItem>
    );
};

export const InviteDropdown = ({ inviteCode }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <DotsThreeIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <CopyInviteItem inviteCode={inviteCode} />

                <DropdownMenuSeparator />

                <RevokeInviteItem />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
