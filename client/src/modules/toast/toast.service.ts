import type { ToastOptions } from './toast.config';
import { createToast, dismiss } from './toast.store';

export const toast = Object.assign(
    (message: string, options?: ToastOptions) =>
        createToast(message, 'default', options),

    {
        dismiss,

        success: (msg: string, opt?: ToastOptions) =>
            createToast(msg, 'success', opt),

        error: (msg: string, opt?: ToastOptions) =>
            createToast(msg, 'error', opt),

        loading: (msg: string, opt?: ToastOptions) =>
            createToast(msg, 'loading', opt),

        promise: async <T>(
            promise: Promise<T>,
            messages: {
                loading: string;
                success: string;
                error: string;
            },
            options?: ToastOptions,
        ) => {
            const id = createToast(messages.loading, 'loading', options);

            try {
                const result = await promise;

                createToast(messages.success, 'success', {
                    ...options,
                    id,
                });

                return result;
            } catch (error) {
                createToast(messages.error, 'error', {
                    ...options,
                    id,
                });

                return undefined;
            }
        },
    },
);
