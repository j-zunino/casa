import { useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

import type { RefObject } from "react";

export const useIsTruncated = <T extends HTMLElement>() => {
    const ref = useRef<T>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useResizeObserver({
        ref: ref as RefObject<T>,
        onResize: () => {
            const node = ref.current;
            if (!node) return;

            setIsTruncated(node.scrollWidth > node.clientWidth);
        },
    });

    return {
        ref: ref as RefObject<T>,
        isTruncated,
    };
};
