import { prisma } from '@/config';
import { requireAuth } from '@/modules/auth';
import type { ApiResponse } from '@casa/types';
import { type Request, type Response, Router } from 'express';

export const router: Router = Router();

// TODO: Show if user is part of active house
router.get('/', requireAuth, async (_req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
        },
    });

    const response: ApiResponse<typeof users> = {
        success: true,
        data: users,
    };

    res.json(response);
});
