import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'none' | 'default';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const Button = ({ label, ...props }: Props) => {
    return <button>{label}</button>;
};
