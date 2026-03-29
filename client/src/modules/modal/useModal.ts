import { useRef } from 'react';

export const useModal = () => {
    const ref = useRef<HTMLDialogElement>(null);

    return {
        ref,
        open: () => ref.current?.showModal(),
        close: () => ref.current?.close(),
    };
};
