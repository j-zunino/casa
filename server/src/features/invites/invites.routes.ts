import { prisma } from "@/config";
import { requireAuth } from "@/features/auth";
import { Router } from "express";

import type { ApiResponse, Invitation } from "@casa/types";
import type { Request, Response } from "express";
import { invitationServices } from "./invites.services";

export const router: Router = Router();

router.get(
    "/:inviteCode",
    async (req: Request<{ inviteCode: Invitation["code"] }>, res: Response) => {
        const { inviteCode } = req.params;

        const invitation = await invitationServices.getInvitation(prisma, {
            where: { code: inviteCode },
            include: {
                house: {
                    select: {
                        name: true,
                        slug: true,
                        logo: true,
                    },
                },
            },
        });

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
            await invitationServices.joinInvite(
                tx,
                inviteCode,
                res.locals.user.id,
            );
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
