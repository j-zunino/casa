import { auth, requireAuth } from '@/modules/auth';
import { houseSchema } from '@casa/schemas';
import { type ApiResponse } from '@casa/types';
import { Router, type Request, type Response } from 'express';
import { parse } from 'zod';
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

router.post('/', requireAuth, async (req: Request, res: Response) => {
    const validated = parse(houseSchema, req.body);

    const slug = generateHouseSlug(validated.name);

    const house = await auth.api.createOrganization({
        headers: req.headers,
        body: {
            name: validated.name,
            slug: slug,
        },
    });

    const response: ApiResponse<typeof house> = {
        success: true,
        data: house,
    };

    res.status(201).json(response);
});

router.get(
    '/:id',
    requireAuth,
    async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;

        const house = await auth.api.getFullOrganization({
            headers: req.headers,
            query: {
                organizationId: id,
                membersLimit: 10,
            },
        });

        const response: ApiResponse<typeof house> = {
            success: true,
            data: house,
        };

        res.json(response);
    },
);

router.put(
    '/:id',
    requireAuth,
    async (req: Request<{ id: string }>, res: Response) => {
        const { id } = req.params;
        const validated = parse(houseSchema, req.body);

        const slug = generateHouseSlug(validated.name);

        const house = await auth.api.updateOrganization({
            headers: req.headers,
            body: {
                organizationId: id,
                data: {
                    name: validated.name,
                    slug: slug,
                },
            },
        });

        const response: ApiResponse<typeof house> = {
            success: true,
            data: house,
        };

        res.json(response);
    },
);

router.post(
    '/:id',
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
