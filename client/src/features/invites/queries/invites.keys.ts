import type { House } from "@/features/houses/types";
import type { Invitation } from "@casa/types";

export const invitesKeys = {
    base: () => ["invites"] as const,
    list: (houseSlug: House["slug"], page = 1, limit = 10) =>
        [...invitesKeys.base(), "list", houseSlug, page, limit] as const,
    detailsBase: () => [...invitesKeys.base(), "details"] as const,
    details: (inviteCode: Invitation["code"]) =>
        [...invitesKeys.detailsBase(), inviteCode] as const,
};
