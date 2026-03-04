import type { ButtonHTMLAttributes } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | '';
    size?: 'md' | '';
}

const buttonVariants = createVariants({
    variants: {
        default:
            'bg-surface-100 text-black active:bg-surface-800 active:text-surface-100 hover:cursor-pointer',
        outline:
            'border border-surface-700 bg-surface-900 disabled:cursor-not-allowed',
    },
    sizes: {
        md: 'px-4 py-2 text-base',
    },
});

export const Button = ({ variant, size, ...props }: Props) => {
    return <button className={buttonVariants(variant, size)} {...props} />;
};
