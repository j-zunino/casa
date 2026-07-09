import { api } from "@/lib/api";

import type { House } from "@/features/houses/types";
import type { Invitation } from "@casa/types";

export const invitesApi = {
    async getAll(houseSlug: House["slug"], page = 1, limit = 10) {
        return api(`/houses/${houseSlug}/invites`, { page, limit });
    },

    async getDetails(inviteCode: Invitation["code"]) {
        const { data } = await api(`/invites/${inviteCode}`);
        return data;
    },

    async create(houseSlug: House["slug"], maxUses: Invitation["maxUses"]) {
        const { data } = await api(`/houses/${houseSlug}/invites`, {
            method: "POST",
            body: JSON.stringify({
                maxUses,
            }),
        });
        return data;
    },

    async join(inviteCode: Invitation["code"]) {
        const { data } = await api(`/invites/${inviteCode}/join`, {
            method: "POST",
        });
        return data;
    },

    async update(
        houseSlug: House["slug"],
        inviteCode: Invitation["code"],
        maxUses: Invitation["maxUses"],
    ) {
        const { data } = await api(
            `/houses/${houseSlug}/invites/${inviteCode}`,
            {
                method: "PATCH",
                body: JSON.stringify({ maxUses }),
            },
        );
        return data;
    },

    async revoke(houseSlug: House["slug"], inviteCode: Invitation["code"]) {
        const { data } = await api(
            `/houses/${houseSlug}/invites/${inviteCode}/revoke`,
            {
                method: "POST",
            },
        );
        return data;
    },
};
