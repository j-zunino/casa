import { auth } from "@/features/auth";
import { AppError } from "@/utils";
import { ErrorCodes } from "@casa/types";
import { invitationQueries } from "./invites.queries";

import type { Client } from "@/config";
import type { InvitationFindUniqueArgs } from "@/generated/prisma/models";

export const invitationServices = {
    async getInvitation(client: Client, options: InvitationFindUniqueArgs) {
        const invitation = await invitationQueries.findInvitation(client, {
            ...options,
        });

        if (!invitation) {
            throw new AppError("invite not found", 404, ErrorCodes.NOT_FOUND);
        }

        return invitation;
    },

    async joinInvite(client: Client, code: string, userId: string) {
        const invitation = await invitationServices.getInvitation(client, {
            where: { code },
            select: {
                id: true,
                status: true,
                maxUses: true,
                useCount: true,
                houseId: true,
            },
        });

        if (invitation.status === "revoked") {
            throw new AppError("invite revoked", 403, ErrorCodes.FORBIDDEN);
        }

        // TODO:FIX: Invitations cant get expired status
        if (
            invitation.status === "expired" ||
            (invitation.maxUses !== null &&
                invitation.useCount >= invitation.maxUses)
        ) {
            await invitationQueries.updateInvitation(client, {
                where: { id: invitation.id },
                data: {
                    status: "expired",
                },
            });

            throw new AppError("invite expired", 403, ErrorCodes.FORBIDDEN);
        }

        await auth.api.addMember({
            body: {
                userId,
                organizationId: invitation.houseId,
                role: ["member"],
            },
        });

        await invitationQueries.updateInvitation(client, {
            where: { id: invitation.id },
            data: {
                useCount: { increment: 1 },
            },
        });
    },
};
