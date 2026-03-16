import type { InputHTMLAttributes } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: 'default' | 'error';
    size?: 'md';
    label?: string;
    error?: string;
}

// prettier-ignore
const inputVariants = createVariants({
    base: "w-full bg-secondary-2 text-secondary-12 border placeholder-secondary-6 transition-colors",
    variants: {
        default: 'border-secondary-6 outline-primary-8',
        error: 'text-primary-red border-primary-red outline-secondary-red',
    },
    sizes: {
        md: 'px-4 py-2 text-base',
    },
});

export const Input = ({ variant, size, label, error, ...props }: Props) => {
    if (error) variant = 'error';

    return (
        <label className="flex flex-col gap-1">
            {label && <span>{label}</span>}
            <input
                className={inputVariants(variant, size)}
                name={label}
                {...props}
            />

            {/* Add icon */}
            {error && <span className="text-primary-red text-sm">{error}</span>}
        </label>
    );
};
