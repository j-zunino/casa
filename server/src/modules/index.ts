import { corsOptions, limiter } from '@/config';
import { errorMiddleware } from '@/middleware';
import { AppError, registerRoutes } from '@/utils';
import { ErrorCodes } from '@casa/types';
import cors from 'cors';
import { NextFunction, Request, Response, Router } from 'express';
import helmet from 'helmet';

import { authRouter } from './auth';
import { healthRouter } from './health';
import { invitesRouter } from './invites';
import { meRouter } from './me';

const router: Router = Router();

router.use(limiter);
router.use(helmet());
router.use(cors(corsOptions));

registerRoutes(router, [
    { prefix: '/auth', router: authRouter, skipJson: true },
    { prefix: '/health', router: healthRouter },
    { prefix: '/me', router: meRouter },
    { prefix: '/invites', router: invitesRouter },
]);

// Handle 404 routes
router.use((req: Request, _res: Response, next: NextFunction) => {
    next(
        new AppError(
            `route ${req.originalUrl} not found`,
            404,
            ErrorCodes.NOT_FOUND,
        ),
    );
});

router.use(errorMiddleware);

export { router as mainRouter };
