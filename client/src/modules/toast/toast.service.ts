import { createContext, useContext } from 'react';

interface ToastContextType {
    toast: {
        (message: string, timeout?: number): string;

        success(message: string, timeout?: number): string;
        error(message: string, timeout?: number): string;
        loading(message: string): string;

        promise<T>(
            promise: Promise<T>,
            options: {
                loading: string;
                success: (data: T) => string;
                error: (error: unknown) => string;
            },
        ): Promise<T>;
    };

    close: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
    toast: Object.assign((_message: string, _timeout?: number) => '', {
        success: (_message: string, _timeout?: number) => '',
        error: (_message: string, _timeout?: number) => '',
        loading: (_message: string) => '',
        promise: async <T>(p: Promise<T>) => p,
    }),

    close: () => {},
});

export const useToast = () => useContext(ToastContext);

export default ToastContext;
