import type { ButtonHTMLAttributes } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'none';
    size?: 'md' | 'none';
}

// prettier-ignore
const buttonVariants = createVariants({
    base: 'hover:cursor-pointer',
    variants: {
        default: 'bg-primary-9 hover:bg-primary-10 active:brightness-active text-primary-1 outline-offset-(--outline-default-offset)',
        outline: 'bg-secondary-2 text-secondary-12 border border-secondary-6',
    },
    sizes: {
        md: 'px-4 py-2',
    },
});

// TODO: Add icon support
export const Button = ({ variant, size, ...props }: Props) => {
    return <button className={buttonVariants(variant, size)} {...props} />;
};
