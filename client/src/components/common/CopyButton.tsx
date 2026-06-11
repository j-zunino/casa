import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ComponentPropsWithoutRef,
} from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface CopyButtonProps extends Omit<
    ComponentPropsWithoutRef<typeof Button>,
    'onClick'
> {
    value: string;
    showCopiedLabel?: boolean;
}

export const CopyButton = ({
    value,
    showCopiedLabel = false,
    disabled,
    ...props
}: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleCopy = useCallback(async () => {
        if (!value || disabled) return;

        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            toast.success('Copied to clipboard');

            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            toast.error('Failed to copy to clipboard');
        }
    }, [value, disabled]);

    return (
        <div onClick={handleCopy} disabled={disabled} {...props}>
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied && showCopiedLabel ? 'Copied' : 'Copy'}
        </div>
    );
};
