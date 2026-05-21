import { auth, requireAuth } from '@/modules/auth';
import { type ApiResponse } from '@casa/types';
import { Router, type Request, type Response } from 'express';

export const router: Router = Router();

router.post(
    '/:id/set-active',
    requireAuth,
    async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;

        const house = await auth.api.setActiveOrganization({
            headers: req.headers,
            body: {
                organizationId: id,
            },
        });

        const response: ApiResponse<typeof house> = {
            success: true,
            data: house,
        };

        res.json(response);
    },
);

router.delete(
    '/:id',
    requireAuth,
    async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;

        const house = await auth.api.deleteOrganization({
            headers: req.headers,
            body: {
                organizationId: id,
            },
        });

        const response: ApiResponse<typeof house> = {
            success: true,
            data: house,
        };

        res.json(response);
    },
);
