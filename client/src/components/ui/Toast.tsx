import { createVariants } from '../../modules/tailwindcss';

interface Props {
    variant?: 'default' | '';
    size?: 'md' | '';
    title?: string;
}

const toastVariants = createVariants({
    base: 'max-w-sm w-fit',
    variants: {
        default: 'bg-secondary-2 border border-secondary-6',
    },
    sizes: {
        md: 'px-4 py-2',
    },
});

export const Toast = ({ variant, size, title }: Props) => {
    return <div className={toastVariants(variant, size)}>{title}</div>;
};
