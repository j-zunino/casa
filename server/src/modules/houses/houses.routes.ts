import { prisma } from "@/config";
import { AppError } from "@/utils";
import { inviteLinkSchema } from "@casa/schemas";
import { ErrorCodes } from "@casa/types";
import { Router } from "express";
import crypto from "node:crypto";
import { requireAuth, requirePermission } from "../auth";
import { getHouseBySlug } from "./houses.utils";

import type { ApiResponse } from "@casa/types";
import type { Request, Response } from "express";

export const router: Router = Router();

router.get(
    "/:houseSlug/invites",
    requireAuth,
    // TODO: add "view" permission
    requirePermission({ invitation: ["create"] }),
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const { houseSlug } = req.params;

        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(
            50,
            Math.max(1, parseInt(req.query.limit as string) || 10),
        );
        const skip = (page - 1) * limit;
        const take = limit;

        const house = await getHouseBySlug(houseSlug);

        const [invitations, total] = await prisma.$transaction([
            prisma.invitation.findMany({
                where: { houseId: house.id },
                include: {
                    inviter: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
                skip,
                take,
                orderBy: { createdAt: "desc" },
            }),
            prisma.invitation.count({
                where: { houseId: house.id },
            }),
        ]);

        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1;

        const response: ApiResponse<typeof invitations> = {
            success: true,
            data: invitations,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext,
                hasPrevious,
            },
        };

        res.json(response);
    },
);

router.post(
    "/:houseSlug/invites",
    requireAuth,
    requirePermission({ invitation: ["create"] }),
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const { houseSlug } = req.params;
        const { maxUses } = inviteLinkSchema.parse(req.body);

        const house = await getHouseBySlug(houseSlug);

        const code = crypto.randomBytes(6).toString("base64url");
        const invitation = await prisma.invitation.create({
            data: {
                id: crypto.randomUUID(),
                code,
                houseId: house.id,
                inviterId: res.locals.user.id,
                maxUses,
            },
        });

        const response: ApiResponse<typeof invitation> = {
            success: true,
            data: invitation,
        };

        res.json(response);
    },
);

router.patch(
    "/:houseSlug/invites/:inviteCode",
    requireAuth,
    requirePermission({ invitation: ["create"] }),
    async (
        req: Request<{ inviteCode: string; houseSlug: string }>,
        res: Response,
    ) => {
        const { inviteCode } = req.params;
        const { maxUses } = inviteLinkSchema.parse(req.body);

        const invitation = await prisma.invitation.findUnique({
            where: { code: inviteCode },
            select: { id: true, status: true },
        });

        if (!invitation) {
            throw new AppError("invite not found", 404, ErrorCodes.NOT_FOUND);
        }

        if (invitation.status !== "active") {
            throw new AppError(
                "can only edit active invites",
                400,
                ErrorCodes.BAD_REQUEST,
            );
        }

        const updated = await prisma.invitation.update({
            where: { id: invitation.id },
            data: { maxUses },
        });

        const response: ApiResponse<typeof updated> = {
            success: true,
            data: updated,
        };

        res.json(response);
    },
);

router.post(
    "/:houseSlug/invites/:inviteCode/revoke",
    requireAuth,
    requirePermission({ invitation: ["cancel"] }),
    async (
        req: Request<{ inviteCode: string; houseSlug: string }>,
        res: Response,
    ) => {
        const { inviteCode } = req.params;

        const invitation = await prisma.invitation.findUnique({
            where: { code: inviteCode },
            select: { id: true, status: true },
        });

        if (!invitation) {
            throw new AppError("invite not found", 404, ErrorCodes.NOT_FOUND);
        }

        if (invitation.status === "revoked") {
            throw new AppError(
                "invite already revoked",
                400,
                ErrorCodes.BAD_REQUEST,
            );
        }

        const updated = await prisma.invitation.update({
            where: { id: invitation.id },
            data: {
                status: "revoked",
                revokedAt: new Date(),
                revokedById: res.locals.user.id,
            },
        });

        const response: ApiResponse<typeof updated> = {
            success: true,
            data: updated,
        };

        res.json(response);
    },
);
