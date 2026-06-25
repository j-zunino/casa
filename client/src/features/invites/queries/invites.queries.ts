import { queryOptions } from "@tanstack/react-query";
import { invitesApi } from "../api";
import { invitesKeys } from "./invites.keys";

import type { House } from "@/features/houses/types";

export const invitesQueries = {
    all(houseSlug: House["slug"], options?: { page?: number; limit?: number }) {
        const page = options?.page ?? 1;
        const limit = options?.limit ?? 10;

        return queryOptions({
            queryKey: invitesKeys.list(houseSlug, page, limit),
            queryFn: () => invitesApi.getAll(houseSlug, page, limit),
        });
    },

    details(inviteCode: string) {
        return queryOptions({
            queryKey: invitesKeys.details(inviteCode),
            queryFn: () => invitesApi.getDetails(inviteCode),
        });
    },
};
