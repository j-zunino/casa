import { toast } from "sonner";
import { useCallback } from "react";

import { CopyIcon } from "@phosphor-icons/react";

import type { ComponentProps } from "react";

interface CopyButtonProps extends ComponentProps<"div"> {
    value: string;
    disabled: boolean;
}

export const CopyButton = ({ value, disabled, ...props }: CopyButtonProps) => {
    const handleCopy = useCallback(async () => {
        if (!value || disabled) return;

        try {
            await navigator.clipboard.writeText(value);
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy to clipboard");
        }
    }, [value, disabled]);

    return (
        <div onClick={handleCopy} {...props}>
            <CopyIcon />
            Copy
        </div>
    );
};
