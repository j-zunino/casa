import { memo } from 'react';
import { createVariants } from '@/modules/tailwindcss';
import type { ToastVariant } from '@/modules/toast';
import { Loading } from '@/components/shared';

interface Props {
    id?: string;
    variant?: ToastVariant;
    size?: 'md';
    message?: string;
    onDismiss?: () => void;
}

const toastVariants = createVariants({
    base: 'border flex bg-secondary-2 max-w-sm items-center gap-2 animate-slide-in cursor-pointer active:scale-(--scale-active)',
    variants: {
        default: 'border-border',
        success: 'border-primary-green',
        error: 'border-destructive',
        loading: 'border-border animate-pulse',
    },
    sizes: {
        md: 'px-4 py-2',
    },
});

export const Toast = memo(({ variant, size, message, onDismiss }: Props) => {
    return (
        <>
            <div
                className={toastVariants(variant, size)}
                onClick={onDismiss}
                role="alert"
            >
                {variant === 'loading' && <Loading size="sm" />}

                {message}
            </div>
        </>
    );
});
