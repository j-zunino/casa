import { prisma } from '@/config';
import { auth, requireAuth, requirePermission } from '@/modules/auth';
import { inviteLinkSchema } from '@casa/schemas';
import { Router } from 'express';
import crypto from 'node:crypto';

import type { ApiResponse } from '@casa/types';
import type { Request, Response } from 'express';

export const router: Router = Router();

router.get(
    '/list/:houseId',
    requireAuth,
    // TODO: add "view" permission
    requirePermission({ invitation: ['create'] }),
    async (req: Request<{ houseId: string }>, res: Response) => {
        const { houseId } = req.params;

        const invitations = await prisma.invitation.findMany({
            where: { houseId },
        });

        const response: ApiResponse<typeof invitations> = {
            success: true,
            data: invitations,
        };

        res.json(response);
    },
);

router.get(
    '/:inviteCode',
    async (req: Request<{ inviteCode: string }>, res: Response) => {
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
            throw new AppError('invite not found', 404, ErrorCodes.NOT_FOUND);
        }

        const response: ApiResponse<typeof invitation> = {
            success: true,
            data: invitation,
        };

        res.json(response);
    },
);

router.post(
    '/create/:houseId',
    requireAuth,
    requirePermission({ invitation: ['create'] }),
    async (req: Request<{ houseId: string }>, res: Response) => {
        const { houseId } = req.params;
        const { maxUses, expiresAt } = inviteLinkSchema.parse(req.body);

        const code = crypto.randomBytes(16).toString('base64url');
        const invitation = await prisma.invitation.create({
            data: {
                id: crypto.randomUUID(),
                code,
                houseId,
                inviterId: res.locals.user.id,
                maxUses,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
            },
        });

        const response: ApiResponse<typeof invitation> = {
            success: true,
            data: invitation,
        };

        res.json(response);
    },
);
