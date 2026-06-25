import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-md p-4">{children}</div>
        </div>
    );
};
