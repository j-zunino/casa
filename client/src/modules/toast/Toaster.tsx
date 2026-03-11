import { useEffect, useState } from 'react';
import toast, { subscribe, type ToastConfig } from '.';
import { Toast } from '../../components/ui';

export const Toaster = () => {
    const [toasts, setToasts] = useState<ToastConfig[]>([]);

    useEffect(() => {
        const unsubscribe = subscribe(setToasts);
        return unsubscribe;
    }, []);

    return (
        <div className="fixed right-2 bottom-2 flex flex-col items-end gap-2">
            {toasts.map((t) => (
                <Toast
                    key={t.id}
                    id={t.id}
                    variant={t.variant}
                    message={t.message}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ))}
        </div>
    );
};
