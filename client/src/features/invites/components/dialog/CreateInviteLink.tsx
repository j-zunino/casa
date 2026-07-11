import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { CopyIcon } from "@phosphor-icons/react";

import type { Invitation } from "@casa/types";

interface Props {
    inviteCode: Invitation["code"];
    isPending: boolean;
    onEdit?: () => void;
}

export const CreateInviteLink = ({ inviteCode, isPending, onEdit }: Props) => {
    const inviteLink = `${window.location.origin}/${isPending ? "..." : inviteCode}`;

    const handleCopy = async () => {
        toast.promise(copyToClipboard(inviteLink), {
            loading: "Copying to clipboard...",
            success: "Copied to clipboard!",
            error: "Failed to copy to clipboard",
        });
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Send a invite link to people</DialogTitle>
                <DialogDescription>
                    Your invite link will expire after 5 uses.
                    {onEdit && (
                        <Button variant="link" size="xs" onClick={onEdit}>
                            Edit invite link
                        </Button>
                    )}
                </DialogDescription>
            </DialogHeader>

            <InputGroup>
                <InputGroupInput value={inviteLink} readOnly />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="secondary"
                        onClick={handleCopy}
                        disabled={isPending}
                    >
                        <CopyIcon />
                        Copy
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </>
    );
};
