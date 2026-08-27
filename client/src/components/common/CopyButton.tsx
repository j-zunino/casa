import { useCopy } from "@/lib/hooks/useCopy";

import { CopyIcon } from "@phosphor-icons/react";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
    value: string;
    disabled?: boolean;
}

export const CopyButton = ({ value, disabled, ...props }: Props) => {
    const copy = useCopy();

    const handleCopy = () => {
        if (!value || disabled) return;

        copy(value);
    };

    return (
        <button onClick={handleCopy} aria-disabled={disabled} {...props}>
            <CopyIcon />
            Copy
        </button>
    );
};
