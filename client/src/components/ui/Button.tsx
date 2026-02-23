import type { ButtonHTMLAttributes } from 'react';
import { createVariants } from '../../modules/tailwindcss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    size?: string;
}

const buttonVariants = createVariants({
    variants: {
        default: 'bg-white text-black',
    },
    sizes: {
        md: 'px-4 py-2 text-base',
    },
});

export const Button = ({ variant, size, ...props }: Props) => {
    return <button className={buttonVariants(variant, size)} {...props} />;
};
