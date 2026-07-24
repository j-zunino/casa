import { queryOptions } from "@tanstack/react-query";
import { todosApi } from "../api";
import { todosKeys } from "./todos.keys";

import type { House } from "@/features/houses/types";

export const todosQueries = {
    list(
        houseSlug: House["slug"],
        options?: { page?: number; limit?: number },
    ) {
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;

        return queryOptions({
            queryKey: todosKeys.list(houseSlug, page, limit),
            queryFn: () => todosApi.getAll(houseSlug, page, limit),
        });
    },

    details(houseSlug: House["slug"], id: string) {
        return queryOptions({
            queryKey: todosKeys.details(houseSlug, id),
            queryFn: () => todosApi.getById(houseSlug, id),
        });
    },
};
