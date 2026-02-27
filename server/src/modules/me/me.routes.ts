import type { ApiResponse } from '@casa/shared';
import { type Request, type Response, Router } from 'express';
import { requireAuth } from '../auth/index.ts';

export const router: Router = Router();

router.get('/', requireAuth, async (_req: Request, res: Response, next) => {
    try {
        const { user } = res.locals;

        const response: ApiResponse<typeof user> = {
            success: true,
            data: user,
        };

        res.json(response);
    } catch (error) {
        next(error);
    }
});
