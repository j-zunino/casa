import { queryOptions } from "@tanstack/react-query";
import { housesKeys } from "./houses.keys";
import { housesApi } from "../api";

import type { House } from "../types";

export const housesQueries = {
    // TODO: Include count?
    all() {
        return queryOptions({
            queryKey: housesKeys.list(),
            queryFn: housesApi.getAll,
        });
    },

    details(slug: House["slug"]) {
        return queryOptions({
            queryKey: housesKeys.details(slug),
            queryFn: () => housesApi.getDetails(slug),
        });
    },

    users(slug: House["slug"], options?: { page?: number; limit?: number }) {
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;

        return queryOptions({
            queryKey: housesKeys.users(slug, page, limit),
            queryFn: () => housesApi.getUsers(slug, page, limit),
        });
    },
};
