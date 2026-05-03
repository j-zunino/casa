import { type ApiResponse } from '@casa/types';
import { Router, type Request, type Response } from 'express';
import z from 'zod';
import { houseSchema } from '../../../../packages/schemas/src';
import { validate } from '../../middleware';
import { mapAuthError } from '../auth/auth.utils';
import { auth, requireAuth } from '../auth/index';
import { generateHouseSlug } from './houses.utils';

export const router: Router = Router();

router.get('/', requireAuth, async (req: Request, res: Response) => {
    const data = await auth.api.listOrganizations({ headers: req.headers });

    const response: ApiResponse<typeof data> = {
        success: true,
        data,
    };

    res.json(response);
});

router.post(
    '/',
    requireAuth,
    validate(houseSchema),
    async (req: Request, res: Response) => {
        const data = req.body as z.infer<typeof houseSchema>;

        const slug = generateHouseSlug(data.name);

        try {
            const house = await auth.api.createOrganization({
                headers: req.headers,
                body: {
                    name: data.name,
                    slug: slug,
                },
            });

            const response: ApiResponse<typeof house> = {
                success: true,
                data: house,
            };

            res.status(201).json(response);
        } catch (err) {
            mapAuthError(err);
        }
    },
);
