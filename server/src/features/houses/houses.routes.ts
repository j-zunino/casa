import { prisma } from "@/config";
import { inviteLinkSchema } from "@casa/schemas";
import { Router } from "express";
import { requireAuth, requirePermission } from "../auth";
import { housesServices } from "./houses.services";

import type { ApiResponse, Invitation } from "@casa/types";
import type { Request, Response } from "express";

export const router: Router = Router();

router.get(
    "/:houseSlug/permissions",
    requireAuth,
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const permissions = await housesServices.getPermissions(
            prisma,
            res.locals.user.id,
            req.params.houseSlug,
        );

        const response: ApiResponse<typeof permissions> = {
            success: true,
            data: permissions,
        };

        res.json(response);
    },
);

router.get(
    "/:houseSlug/invites",
    requireAuth,
    requirePermission({ invitation: ["read"] }),
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const { houseSlug } = req.params;

        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(
            50,
            Math.max(1, parseInt(req.query.limit as string) || 10),
        );

        const { invitations, pagination } =
            await housesServices.listInvitations(
                prisma,
                houseSlug,
                page,
                limit,
            );

        const response: ApiResponse<typeof invitations> = {
            success: true,
            data: invitations,
            pagination,
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

        const invitation = await housesServices.createInviteLink(
            prisma,
            houseSlug,
            res.locals.user.id,
            maxUses,
        );

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
    requirePermission({ invitation: ["update"] }),
    async (
        req: Request<{ inviteCode: Invitation["code"]; houseSlug: string }>,
        res: Response,
    ) => {
        const { inviteCode } = req.params;
        const { maxUses } = inviteLinkSchema.parse(req.body);

        const updated = await housesServices.updateInviteLink(
            prisma,
            inviteCode,
            maxUses,
        );

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
    requirePermission({ invitation: ["revoke"] }),
    async (
        req: Request<{ inviteCode: Invitation["code"]; houseSlug: string }>,
        res: Response,
    ) => {
        const { inviteCode } = req.params;

        const updated = await housesServices.revokeInviteLink(
            prisma,
            inviteCode,
            res.locals.user.id,
        );

        const response: ApiResponse<typeof updated> = {
            success: true,
            data: updated,
        };

        res.json(response);
    },
);
