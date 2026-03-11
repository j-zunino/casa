import { memo } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props {
    id?: string;
    variant?: ToastVariant;
    size?: 'md';
    message?: string;
    onDismiss?: () => void;
}

const toastVariants = createVariants({
    base: 'max-w-sm w-fit border bg-secondary-2 animate-slide-in cursor-pointer',
    variants: {
        default: 'bg-secondary-2 border border-secondary-6',
    },
    sizes: {
        md: 'px-4 py-2',
    },
});

export const Toast = memo(({ variant, size, message, onDismiss }: Props) => {
    return (
        <div 
            className={toastVariants(variant, size)} 
            onClick={onDismiss}
            role="alert"
        >
            {message}
        </div>
    );
});
