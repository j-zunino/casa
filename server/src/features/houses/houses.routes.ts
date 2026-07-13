import { prisma } from "@/config";
import { AppError } from "@/utils";
import { inviteLinkSchema } from "@casa/schemas";
import { ErrorCodes } from "@casa/types";
import { Router } from "express";
import { getRolePermissions, requireAuth, requirePermission } from "../auth";
import { housesServices } from "./houses.services";

import type { ApiResponse, Invitation } from "@casa/types";
import type { Request, Response } from "express";

export const router: Router = Router();

router.get(
    "/:houseSlug/members/me",
    requireAuth,
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const member = await prisma.member.findFirst({
            where: {
                userId: res.locals.user.id,
                house: { slug: req.params.houseSlug },
            },
        });

        if (!member) {
            throw new AppError("not a member", 403, ErrorCodes.FORBIDDEN);
        }

        const response: ApiResponse<
            typeof member & {
                permissions: ReturnType<typeof getRolePermissions>;
            }
        > = {
            success: true,
            data: {
                ...member,
                permissions: getRolePermissions(member.role),
            },
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
