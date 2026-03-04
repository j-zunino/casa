import { useState, type ReactNode } from 'react';
import ToastContext from './toast.service';

export interface ToastItem {
    id: string;
    component: ReactNode;
    closing?: boolean;
}

interface Props {
    children: ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
    const [toast, setToast] = useState<ToastItem[]>([]);

    const close = (id: ToastItem['id']) => {
        setToast((toasts) =>
            toasts.map((t) => (t.id === id ? { ...t, closing: true } : t)),
        );

        setTimeout(() => {
            setToast((toasts) => toasts.filter((t) => t.id !== id));
        }, 300);
    };

    const open = (component: ToastItem['component'], timeout = 5000) => {
        const id = crypto.randomUUID();
        setToast((toasts) => [...toasts, { id, component }]);
        setTimeout(() => close(id), timeout);
    };

    return (
        <ToastContext.Provider value={{ open, close }}>
            {children}
            <div className="absolute right-0 bottom-0 m-2 flex flex-col items-end gap-2">
                {toast.map(({ id, component, closing }) => (
                    <div
                        key={id}
                        className={`${closing ? 'animate-slide-out' : 'animate-slide-in'} relative transition-all duration-300`}
                    >
                        {component}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
