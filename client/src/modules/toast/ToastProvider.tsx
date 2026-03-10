import { useState, type ReactNode } from 'react';
import { Toast } from '../../components/ui';
import { toastConfig } from './toast.config';
import ToastContext from './toast.service';

export type ToastVariant = 'default' | 'success' | 'error' | 'loading';

export interface ToastOptions {
    message: string;
    variant?: ToastVariant;
    timeout?: number;
}

export interface ToastItem extends Required<ToastOptions> {
    id: string;
    closing?: boolean;
}

interface Props {
    children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const close = (id: string) => {
        setToasts((toasts) =>
            toasts.map((toast) =>
                toast.id === id ? { ...toast, closing: true } : toast,
            ),
        );

        setTimeout(() => {
            setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
        }, 300);
    };

    const open = ({
        message,
        variant = 'default',
        timeout = toastConfig.defaultTimeout,
    }: ToastOptions) => {
        const id = crypto.randomUUID();

        const toast: ToastItem = {
            id,
            message,
            variant,
            timeout,
        };

        setToasts((toasts) => [...toasts, toast]);

        if (timeout !== Infinity) {
            setTimeout(() => close(id), timeout);
        }

        return id;
    };

    const update = (
        id: string,
        {
            message,
            variant = 'default',
            timeout = toastConfig.defaultTimeout,
        }: ToastOptions,
    ) => {
        setToasts((toasts) =>
            toasts.map((toast) =>
                toast.id === id
                    ? { ...toast, message, variant, timeout }
                    : toast,
            ),
        );

        if (timeout !== Infinity) {
            setTimeout(() => close(id), timeout);
        }
    };

    const toast = Object.assign(
        (message: string, timeout?: number) => open({ message, timeout }),

        {
            success: (message: string, timeout?: number) =>
                open({ message, variant: 'success', timeout }),

            error: (message: string, timeout?: number) =>
                open({ message, variant: 'error', timeout }),

            loading: (message: string) =>
                open({ message, variant: 'loading', timeout: Infinity }),

            promise: async <T,>(
                promise: Promise<T>,
                {
                    loading,
                    success,
                    error,
                }: {
                    loading: string;
                    success: (data: T) => string;
                    error: (err: unknown) => string;
                },
            ) => {
                const id = open({
                    message: loading,
                    variant: 'loading',
                    timeout: Infinity,
                });

                try {
                    const data = await promise;

                    update(id, {
                        message: success(data),
                        variant: 'success',
                    });

                    return data;
                } catch (err) {
                    update(id, {
                        message: error(err),
                        variant: 'error',
                    });

                    throw err;
                }
            },
        },
    );

    return (
        <ToastContext.Provider value={{ toast, close }}>
            {children}

            <div className="absolute right-0 bottom-0 m-2 flex flex-col items-end gap-2">
                {toasts.map(({ id, message, variant, closing }) => (
                    <div
                        key={id}
                        className={`${
                            closing ? 'animate-slide-out' : 'animate-slide-in'
                        } transition-all duration-300`}
                    >
                        <Toast message={message} variant={variant} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
