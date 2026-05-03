import { corsOptions } from '@/config';
import { errorMiddleware } from '@/middleware';
import { AppError, registerRoutes } from '@/utils';
import { ErrorCodes } from '@casa/types';
import cors from 'cors';
import { NextFunction, Request, Response, Router } from 'express';
import helmet from 'helmet';

import { authRouter } from './auth';
import { healthRouter } from './health';
import { housesRouter } from './houses';
import { meRouter } from './me';
import { usersRouter } from './users';

const router: Router = Router();

router.use(helmet());
router.use(cors(corsOptions));

registerRoutes(router, [
    { prefix: '/auth', router: authRouter, skipJson: true },
    { prefix: '/health', router: healthRouter },
    { prefix: '/me', router: meRouter },
    { prefix: '/users', router: usersRouter },
    { prefix: '/houses', router: housesRouter },
]);

// Handle 404 routes
router.use((req: Request, _res: Response, next: NextFunction) => {
    next(
        new AppError(
            `Route ${req.originalUrl} not found`,
            404,
            ErrorCodes.NOT_FOUND,
        ),
    );
});

router.use(errorMiddleware);

export { router as mainRouter };
