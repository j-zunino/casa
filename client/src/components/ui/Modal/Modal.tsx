import { forwardRef, type ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    children: ReactNode;
    onClose?: () => void;
}

// TODO: Use createVariants
export const Modal = forwardRef<HTMLDialogElement, Props>(
    ({ title, description, children, onClose }, ref) => {
        return (
            <dialog
                ref={ref}
                onClose={onClose}
                onClick={onClose}
                className="fixed top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/20 backdrop:backdrop-blur-[2px]"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="min-w-md space-y-8 bg-secondary-2 p-4 text-secondary-12"
                >
                    <button className="fixed top-4 right-4" onClick={onClose}>
                        x
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-secondary-11">{description}</p>
                    </div>

                    {children}
                </div>
            </dialog>
        );
    },
);
