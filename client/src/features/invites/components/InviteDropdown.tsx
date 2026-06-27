import { toast } from "sonner";
import { invitesHooks } from "../hooks";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyIcon, DotsThreeIcon, ProhibitIcon } from "@phosphor-icons/react";

import type { House } from "@/features/houses/types";

interface Props {
    inviteCode: string;
    slug: House["slug"];
}

export const InviteDropdown = ({ inviteCode, slug }: Props) => {
    const { mutate: revokeInvite } = invitesHooks.useRevokeInvite(slug);

    const handleCopy = async () => {
        if (!inviteCode) return;

        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/invite/${inviteCode}`,
            );
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy to clipboard");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <DotsThreeIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopy}>
                    <CopyIcon />
                    Copy link
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* TODO: Confirm action */}
                {/* TODO: Only show for admin/owner, needs to implement house role checking */}
                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => revokeInvite(inviteCode)}
                >
                    <ProhibitIcon />
                    Revoke
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
