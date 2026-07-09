import { toast } from "sonner";
import { copyToClipboard } from "@/lib/utils";

import { CopyIcon } from "@phosphor-icons/react";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
    value: string;
    disabled?: boolean;
}

export const CopyButton = ({ value, disabled, ...props }: Props) => {
    const handleCopy = async () => {
        if (!value || disabled) return;

        toast.promise(copyToClipboard(value), {
            loading: "Copying to clipboard...",
            success: "Copied to clipboard!",
            error: "Failed to copy to clipboard",
        });
    };

    return (
        <button onClick={handleCopy} aria-disabled={disabled} {...props}>
            <CopyIcon />
            Copy
        </button>
    );
};
