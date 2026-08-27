import { useCopyToClipboard } from "usehooks-ts";

import { toast } from "sonner";

export function useCopy() {
    const [, copy] = useCopyToClipboard();

    return (text: string) =>
        toast.promise(copy(text), {
            loading: "Copying to clipboard...",
            success: "Copied to clipboard!",
            error: "Failed to copy to clipboard",
        });
}
