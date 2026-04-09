import {
    CheckIcon,
    InfoIcon,
    SpinnerGapIcon,
    WarningIcon,
    XIcon,
} from '@phosphor-icons/react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            className="toaster group"
            icons={{
                success: <CheckIcon className="size-4" weight="bold" />,
                info: <InfoIcon className="size-4" weight="bold" />,
                warning: <WarningIcon className="size-4" weight="bold" />,
                error: <XIcon className="size-4" weight="bold" />,
                loading: <SpinnerGapIcon className="size-4 animate-spin" />,
            }}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--border-radius': 'var(--radius)',
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: 'cn-toast font-sans text-sm!',
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
