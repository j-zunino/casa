import type { ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    children: ReactNode;
}

export const AuthLayout = ({ title, description, children }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-md space-y-8 p-4">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-secondary-11">{description}</p>
                </div>

                <div className="flex flex-col gap-2">{children}</div>
            </div>
        </div>
    );
};
