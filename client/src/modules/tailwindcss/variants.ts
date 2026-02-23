export type VariantValue = Record<string, string>;

interface VariantsConfig {
    base?: string;
    variants?: VariantValue;
    sizes?: VariantValue;
}

export const createVariants = (config: VariantsConfig) => {
    return (variant: string = 'default', size: string = 'md') => {
        const classes: string[] = [];

        if (config.base) {
            classes.push(config.base);
        }

        if (variant && config.variants?.[variant]) {
            classes.push(config.variants[variant]);
        }

        if (size && config.sizes?.[size]) {
            classes.push(config.sizes[size]);
        }

        return classes.join(' ');
    };
};
