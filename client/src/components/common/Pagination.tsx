import {
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

import type { ApiPagination } from "@casa/types";

export const PaginationTotal = ({
    page,
    totalPages,
    total,
}: Pick<ApiPagination, "page" | "totalPages" | "total">) => {
    return (
        <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
            {" — "}
            {total} total
        </span>
    );
};

export const PaginationControls = ({
    page,
    hasPrevious,
    hasNext,
}: Pick<ApiPagination, "page" | "hasPrevious" | "hasNext">) => {
    return (
        <PaginationContent>
            {hasPrevious && (
                <PaginationItem>
                    <PaginationPrevious search={{ page: page - 1 }} />
                </PaginationItem>
            )}

            {hasNext && (
                <PaginationItem>
                    <PaginationNext search={{ page: page + 1 }} />
                </PaginationItem>
            )}
        </PaginationContent>
    );
};
