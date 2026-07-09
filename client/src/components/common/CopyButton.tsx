import { toast } from "sonner";
import { useCallback } from "react";

import { CopyIcon } from "@phosphor-icons/react";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
    value: string;
    disabled: boolean;
}

export const CopyButton = ({ value, disabled, ...props }: Props) => {
    const handleCopy = useCallback(async () => {
        if (!value || disabled) return;

        try {
            await navigator.clipboard.writeText(value);
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy to clipboard");
        }
    }, [value, disabled]);

    // NOTE: Could use radix Slot
    return (
        <div onClick={handleCopy} {...props}>
            <CopyIcon />
            Copy
        </div>
    );
};
