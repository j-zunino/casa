import type { Client } from "@/config";
import type {
    InvitationFindUniqueArgs,
    InvitationUpdateArgs,
} from "@/generated/prisma/models";

export const invitationQueries = {
    async findInvitation(client: Client, options: InvitationFindUniqueArgs) {
        return client.invitation.findUnique({ ...options });
    },

    async updateInvitation(client: Client, options: InvitationUpdateArgs) {
        return client.invitation.update({ ...options });
    },
};
