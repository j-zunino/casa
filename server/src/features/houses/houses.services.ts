import { AppError } from "@/utils";
import { ErrorCodes } from "@casa/types";
import crypto from "node:crypto";
import { housesQueries } from "./houses.queries";

import type { Client } from "@/config";
import type { HouseFindUniqueArgs } from "@/generated/prisma/models";

// TODO: Try to move invite logic to invite module
export const housesServices = {
    async getHouse(client: Client, options: HouseFindUniqueArgs) {
        const house = await housesQueries.findHouse(client, { ...options });

        if (!house) {
            throw new AppError("house not found", 404, ErrorCodes.NOT_FOUND);
        }

        return house;
    },

    async listInvitations(
        client: Client,
        slug: string,
        page: number,
        limit: number,
    ) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        const skip = (page - 1) * limit;
        const take = limit;

        const [invitations, total] = await Promise.all([
            housesQueries.findInvitation(client, {
                where: { houseId: house.id },
                skip,
                take,
                omit: { email: true },
                include: {
                    inviter: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            housesQueries.countInvitations(client, {
                where: { houseId: house.id },
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            invitations,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    },

    async createInviteLink(
        client: Client,
        slug: string,
        userId: string,
        maxUses: number | null | undefined,
    ) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        return housesQueries.createInvitation(client, {
            data: {
                id: crypto.randomUUID(),
                code: crypto.randomBytes(6).toString("base64url"),
                houseId: house.id,
                inviterId: userId,
                maxUses,
            },
        });
    },

    async updateInviteLink(
        client: Client,
        code: string,
        maxUses: number | null | undefined,
    ) {
        const [invitation] = await housesQueries.findInvitation(client, {
            where: { code },
        });

        if (invitation.status !== "active") {
            throw new AppError(
                "can only edit active invites",
                400,
                ErrorCodes.BAD_REQUEST,
            );
        }

        return housesQueries.updateInvitation(client, {
            where: { id: invitation.id },
            data: { maxUses },
        });
    },

    async revokeInviteLink(client: Client, code: string, userId: string) {
        const [invitation] = await housesQueries.findInvitation(client, {
            where: { code },
            select: {
                id: true,
                status: true,
            },
        });

        if (invitation.status !== "active") {
            throw new AppError(
                `invite already ${invitation.status}`,
                400,
                ErrorCodes.BAD_REQUEST,
            );
        }

        return housesQueries.updateInvitation(client, {
            where: { id: invitation.id },
            data: {
                status: "revoked",
                revokedAt: new Date(),
                revokedById: userId,
            },
        });
    },
};
