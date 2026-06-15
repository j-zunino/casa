import { Button } from '@/components/ui/button';
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { CopyIcon } from '@phosphor-icons/react';

interface Props {
    inviteCode: string;
    isPending: boolean;
    onEdit?: () => void;
}

export const CreateInviteLink = ({ inviteCode, isPending, onEdit }: Props) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Send a invite link to people</DialogTitle>
                <DialogDescription className="gap-[1ch]">
                    Your invite link will expire after 5 uses.
                    {onEdit && (
                        <Button variant="link" size="xs" onClick={onEdit}>
                            Edit invite link
                        </Button>
                    )}
                </DialogDescription>
            </DialogHeader>

            <InputGroup>
                <InputGroupInput
                    value={`${window.location.origin}/${isPending ? '...' : inviteCode}`}
                    readOnly
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="secondary" disabled={isPending}>
                        <CopyIcon />
                        Copy
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </>
    );
};
