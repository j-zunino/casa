import type { InputHTMLAttributes } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: 'default' | '';
    size?: 'md' | '';
    label?: string;
}

// prettier-ignore
const inputVariants = createVariants({
    variants: {
        default: 'w-full bg-secondary-2 text-secondary-12 border border-secondary-6 placeholder-secondary-6',
    },
    sizes: {
        md: 'px-4 py-2 text-base',
    },
});

// TODO: Add error state
export const Input = ({ variant, size, label, ...props }: Props) => {
    return (
        <label>
            {label && <span>{label}</span>}
            <input
                className={inputVariants(variant, size)}
                name={label}
                {...props}
            />
        </label>
    );
};
