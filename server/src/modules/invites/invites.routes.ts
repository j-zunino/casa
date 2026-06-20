import { prisma } from '@/config';
import { auth, requireAuth, requirePermission } from '@/modules/auth';
import { getHouseBySlug } from '@/modules/houses';
import { AppError } from '@/utils';
import { inviteLinkSchema } from '@casa/schemas';
import { ErrorCodes } from '@casa/types';
import { Router } from 'express';
import crypto from 'node:crypto';

import type { ApiResponse } from '@casa/types';
import type { Request, Response } from 'express';

export const router: Router = Router();

router.get(
    '/list/:houseSlug',
    requireAuth,
    // TODO: add "view" permission
    requirePermission({ invitation: ['create'] }),
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
                orderBy: { createdAt: 'desc' },
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

// TODO: Add stricter rate-limiting for unauthenticated users
// TODO: Generate UUID with prisma?
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
    '/create/:houseSlug',
    requireAuth,
    requirePermission({ invitation: ['create'] }),
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const { houseSlug } = req.params;
        const { maxUses } = inviteLinkSchema.parse(req.body);

        const house = await getHouseBySlug(houseSlug);

        const code = crypto.randomBytes(6).toString('base64url');
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

router.post(
    '/:inviteCode/join',
    requireAuth,
    async (req: Request<{ inviteCode: string }>, res: Response) => {
        const { inviteCode } = req.params;

        await prisma.$transaction(async (tx) => {
            const invitation = await tx.invitation.findUnique({
                where: { code: inviteCode },
            });

            if (!invitation) {
                throw new AppError(
                    'invite not found',
                    404,
                    ErrorCodes.NOT_FOUND,
                );
            }

            if (invitation.status === 'revoked') {
                throw new AppError('invite revoked', 403, ErrorCodes.FORBIDDEN);
            }

            if (
                invitation.status === 'expired' ||
                (invitation.maxUses !== null &&
                    invitation.useCount >= invitation.maxUses)
            ) {
                await tx.invitation.update({
                    where: { id: invitation.id },
                    data: { status: 'expired' },
                });

                throw new AppError('invite expired', 403, ErrorCodes.FORBIDDEN);
            }

            await auth.api.addMember({
                body: {
                    userId: res.locals.user.id,
                    organizationId: invitation.houseId,
                    role: ['member'],
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
                message: 'joined successfully',
            },
        };

        res.json(response);
    },
);

router.post(
    '/:inviteCode/revoke/:houseSlug',
    requireAuth,
    requirePermission({ invitation: ['cancel'] }),
    async (
        req: Request<{ inviteCode: string; houseSlug: string }>,
        res: Response,
    ) => {
        const { inviteCode } = req.params;

        const invitation = await prisma.invitation.findUnique({
            where: { code: inviteCode },
            select: { id: true, status: true },
        });

        console.log(invitation);

        if (!invitation) {
            throw new AppError('invite not found', 404, ErrorCodes.NOT_FOUND);
        }

        if (invitation.status === 'revoked') {
            throw new AppError(
                'invite already revoked',
                400,
                ErrorCodes.BAD_REQUEST,
            );
        }

        const updated = await prisma.invitation.update({
            where: { id: invitation.id },
            data: {
                status: 'revoked',
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
