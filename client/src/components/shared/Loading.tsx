import { createVariants } from '../../modules/tailwindcss';
interface Props {
    variant?: string;
    size?: string;
}

export const Loading = ({ variant, size }: Props) => {
    const loaderVariants = createVariants({
        base: 'animate-spin rounded-full border-secondary-8 border-b-transparent',
        variants: {
            default: '',
        },
        sizes: {
            xl: 'h-8 w-8 border-3',
            md: 'h-6 w-6 border-3',
            sm: 'h-4 w-4 border-2',
            xs: 'h-3 w-3 border-2',
        },
    });

    return <div className={loaderVariants(variant, size)}></div>;
};
