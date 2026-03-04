import { createContext, useContext, type ReactNode } from 'react';
import type { ToastItem } from './ToastProvider';

interface ToastContextType {
    open: (component: ReactNode, timeout?: number) => void;
    close: (id: ToastItem['id']) => void;
}

const ToastContext = createContext<ToastContextType>({
    open: () => {},
    close: () => {},
});

export const useToast = () => useContext(ToastContext);

export default ToastContext;
