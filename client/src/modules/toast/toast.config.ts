export type ToastVariant = 'default' | 'success' | 'error' | 'loading';

export interface ToastConfig {
    id: string;
    message: string;
    variant: ToastVariant;
    timeout: number;
}

export interface ToastOptions {
    id?: string;
    timeout?: number;
}

export const toastConfig = {
    timeouts: {
        default: 4000,
        error: 4000,
        success: 2000,
        loading: Infinity,
    },
};

export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
