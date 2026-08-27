import { useIsTruncated } from "@/lib/hooks/isTruncated";
import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

interface ScrollingTextProps extends ComponentProps<"div"> {
    disabled?: boolean;
    scrollOnHover?: boolean;
    delay?: number;
    duration?: number;
    repeat?: number;
}

export function ScrollingText({
    className,
    disabled = false,
    scrollOnHover = true,
    delay = 200,
    duration = 20000,
    repeat = 2,
    children,
    ...props
}: ScrollingTextProps) {
    const { ref: measureRef, isTruncated } = useIsTruncated<HTMLSpanElement>();

    const scrolleable = !disabled && isTruncated;

    return (
        <div
            className={cn(
                "group/marquee relative flex gap-(--gap) overflow-hidden [--gap:2rem]",
                scrolleable &&
                    cn(
                        "marquee-fade-x",
                        scrollOnHover
                            ? "hover:marquee-fade-on"
                            : "marquee-fade-on",
                    ),
                className,
            )}
            style={
                {
                    "--duration": `${duration}ms`,
                } as React.CSSProperties
            }
            {...props}
        >
            <span
                ref={measureRef}
                aria-hidden
                className="pointer-events-none absolute inset-x-0 whitespace-nowrap opacity-0"
            >
                {children}
            </span>

            {scrolleable ? (
                Array.from({ length: repeat }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex shrink-0 justify-around gap-(--gap)",
                            scrollOnHover
                                ? "group-hover/marquee:animate-marquee"
                                : "animate-marquee",
                        )}
                        style={{ animationDelay: `${delay}ms` }}
                    >
                        {children}
                    </div>
                ))
            ) : (
                <span className="flex-1 truncate">{children}</span>
            )}
        </div>
    );
}
