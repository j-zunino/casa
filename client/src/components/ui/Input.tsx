import type { InputHTMLAttributes } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    variant?: string;
    size?: string;
    label?: string;
}

const inputVariants = createVariants({
    variants: {
        default:
            'w-full outline-surface-100 border border-surface-700 focus:outline-1',
    },
    sizes: {
        md: 'px-4 py-2 text-base',
    },
});

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
