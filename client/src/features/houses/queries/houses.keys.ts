import type { House } from "../types";

export const housesKeys = {
    base: () => ["houses"] as const,
    list: () => [...housesKeys.base(), "list"] as const,
    detailsBase: () => [...housesKeys.base(), "details"] as const,
    details: (slug?: House["slug"]) =>
        [...housesKeys.detailsBase(), slug] as const,
};
