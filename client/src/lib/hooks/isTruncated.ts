import { useCallback, useLayoutEffect, useState } from "react";

import type { RefCallback } from "react";

export const useIsTruncated = <T extends HTMLElement>() => {
    const [node, setNode] = useState<T | null>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    const check = useCallback(() => {
        if (!node) return;

        setIsTruncated(node.scrollWidth > node.clientWidth);
    }, [node]);

    useLayoutEffect(() => {
        if (!node) return;

        check();

        const observer = new ResizeObserver(check);
        observer.observe(node);

        return () => observer.disconnect();
    }, [node, check]);

    return {
        ref: setNode as RefCallback<T>,
        isTruncated,
    };
};
