import { mutationOptions } from "@tanstack/react-query";
import { invitesApi } from "../api";

import type { House } from "@/features/houses/types";
import type { Invitation } from "@casa/types";

export const invitesMutations = {
    create(houseSlug: House["slug"], maxUses: Invitation["maxUses"]) {
        return mutationOptions({
            mutationFn: () => invitesApi.create(houseSlug, maxUses),
        });
    },

    join(inviteCode: Invitation["code"]) {
        return mutationOptions({
            mutationFn: () => invitesApi.join(inviteCode),
        });
    },

    update(houseSlug: House["slug"]) {
        return mutationOptions({
            mutationFn: ({
                inviteCode,
                maxUses,
            }: {
                inviteCode: Invitation["code"];
                maxUses: Invitation["maxUses"];
            }) => invitesApi.update(houseSlug, inviteCode, maxUses),
        });
    },

    revoke(houseSlug: House["slug"]) {
        return mutationOptions({
            mutationFn: (inviteCode: string) =>
                invitesApi.revoke(houseSlug, inviteCode),
        });
    },
};
