import { prisma } from '@/config';
import { auth, requireAuth } from '@/modules/auth';
import { inviteLinkSchema } from '@casa/schemas';
import { Router } from 'express';
import crypto from 'node:crypto';

import type { ApiResponse } from '@casa/types';
import type { Request, Response } from 'express';

export const router: Router = Router();

router.post(
    '/create-invite/:houseId',
    requireAuth,
    async (req: Request<{ houseId: string }>, res: Response) => {
        const { houseId } = req.params;
        const { maxUses, expiresAt } = inviteLinkSchema.parse(req.body);

        await auth.api.hasPermission({
            headers: req.headers,
            body: {
                organizationId: houseId,
                permissions: {
                    invitation: ['create'],
                },
            },
        });

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
