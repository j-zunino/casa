import { prisma } from "@/config";
import { auth, requireAuth } from "@/modules/auth";
import { AppError } from "@/utils";
import { ErrorCodes } from "@casa/types";
import { Router } from "express";

import type { ApiResponse, Invitation } from "@casa/types";
import type { Request, Response } from "express";

export const router: Router = Router();

// TODO: Add stricter rate-limiting for unauthenticated users
// TODO: Generate UUID with prisma?
router.get(
    "/:inviteCode",
    async (req: Request<{ inviteCode: Invitation["code"] }>, res: Response) => {
        const { inviteCode } = req.params;

        const invitation = await prisma.invitation.findUnique({
            where: { code: inviteCode },
            select: {
                id: true,
                code: true,
                status: true,
                house: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        logo: true,
                    },
                },
            },
        });

        if (!invitation) {
            throw new AppError("invite not found", 404, ErrorCodes.NOT_FOUND);
        }

        const response: ApiResponse<typeof invitation> = {
            success: true,
            data: invitation,
        };

        res.json(response);
    },
);

router.post(
    "/:inviteCode/join",
    requireAuth,
    async (req: Request<{ inviteCode: Invitation["code"] }>, res: Response) => {
        const { inviteCode } = req.params;

        await prisma.$transaction(async (tx) => {
            const invitation = await tx.invitation.findUnique({
                where: { code: inviteCode },
            });

            if (!invitation) {
                throw new AppError(
                    "invite not found",
                    404,
                    ErrorCodes.NOT_FOUND,
                );
            }

            if (invitation.status === "revoked") {
                throw new AppError("invite revoked", 403, ErrorCodes.FORBIDDEN);
            }

            if (
                invitation.status === "expired" ||
                (invitation.maxUses !== null &&
                    invitation.useCount >= invitation.maxUses)
            ) {
                await tx.invitation.update({
                    where: { id: invitation.id },
                    data: { status: "expired" },
                });

                throw new AppError("invite expired", 403, ErrorCodes.FORBIDDEN);
            }

            await auth.api.addMember({
                body: {
                    userId: res.locals.user.id,
                    organizationId: invitation.houseId,
                    role: ["member"],
                },
            });

            await tx.invitation.update({
                where: { id: invitation.id },
                data: {
                    useCount: { increment: 1 },
                },
            });
        });

        const response: ApiResponse<Record<string, string>> = {
            success: true,
            data: {
                message: "joined successfully",
            },
        };

        res.json(response);
    },
);
