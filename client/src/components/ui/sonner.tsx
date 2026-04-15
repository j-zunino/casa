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
                success: <CheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <WarningIcon className="size-4" />,
                error: <XIcon className="size-4" />,
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
