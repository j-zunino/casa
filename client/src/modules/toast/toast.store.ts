import {
    toastConfig,
    type ToastConfig,
    type ToastOptions,
    type ToastVariant,
} from './toast.config';
import { generateId } from './toast.config';

type Listener = (toasts: ToastConfig[]) => void;

const toasts = new Map<string, ToastConfig>();
const listeners = new Set<Listener>();
const timers = new Map<string, ReturnType<typeof setTimeout>>();

const getToastsArray = (): ToastConfig[] => {
    return Array.from(toasts.values());
};

const notify = () => listeners.forEach((listener) => listener(getToastsArray()));

export const dismiss = (id?: string) => {
    if (!id) {
        toasts.clear();
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
    } else {
        const timer = timers.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.delete(id);
        }
        toasts.delete(id);
    }

    notify();
};

export const createToast = (
    message: string,
    variant: ToastVariant,
    options: ToastOptions = {},
): string => {
    const id = options.id ?? generateId();
    const timeout = options.timeout ?? toastConfig.timeouts[variant];

    const existing = toasts.get(id);

    if (existing) {
        // Update existing toast
        toasts.set(id, { ...existing, message, variant, timeout });
    } else {
        // Create new toast
        toasts.set(id, { id, message, variant, timeout });
    }

    // Clear existing timer if updating
    const existingTimer = timers.get(id);
    if (existingTimer) {
        clearTimeout(existingTimer);
        timers.delete(id);
    }

    if (timeout !== Infinity) {
        const timer = setTimeout(() => dismiss(id), timeout);
        timers.set(id, timer);
    }

    notify();

    return id;
};

export const subscribe = (listener: Listener) => {
    listeners.add(listener);
    listener(getToastsArray());

    return () => {
        listeners.delete(listener);
    };
};
