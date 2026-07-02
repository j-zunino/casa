import type { Client } from "@/config";
import type {
    HouseFindUniqueArgs,
    InvitationCountArgs,
    InvitationCreateArgs,
    InvitationFindManyArgs,
    InvitationUpdateArgs,
} from "@/generated/prisma/models";

export const housesQueries = {
    findHouse(client: Client, options: HouseFindUniqueArgs) {
        return client.house.findUnique({ ...options });
    },

    findInvitation(client: Client, options: InvitationFindManyArgs) {
        return client.invitation.findMany({ ...options });
    },

    countInvitations(client: Client, options: InvitationCountArgs) {
        return client.invitation.count({ ...options });
    },

    createInvitation(client: Client, options: InvitationCreateArgs) {
        return client.invitation.create({ ...options });
    },

    updateInvitation(client: Client, options: InvitationUpdateArgs) {
        return client.invitation.update({ ...options });
    },
};
