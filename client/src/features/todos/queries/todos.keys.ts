import type { House } from "@/features/houses/types";

export const todosKeys = {
    base: () => ["todos"] as const,
    list: (houseSlug: House["slug"], page = 1, limit = 10) =>
        [...todosKeys.base(), "list", houseSlug, page, limit] as const,
    details: (houseSlug: House["slug"], id: string) =>
        [...todosKeys.base(), "details", houseSlug, id] as const,
};
