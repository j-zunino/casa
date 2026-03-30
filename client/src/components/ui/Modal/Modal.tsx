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
                className="fixed top-1/2 left-1/2 m-0 w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-slide-in bg-secondary-2 text-secondary-12 backdrop:bg-black/20 backdrop:backdrop-blur-[2px]"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="space-y-8 p-4"
                >
                    {/* TODO: Replace with icon */}
                    <button
                        className="fixed top-4 right-4 cursor-pointer px-2 hover:bg-secondary-4"
                        onClick={onClose}
                    >
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
