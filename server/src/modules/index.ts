import { ErrorCodes } from '@casa/shared';
import cors from 'cors';
import { NextFunction, Request, Response, Router } from 'express';
import { corsOptions } from '../config/index';
import { errorMiddleware } from '../middleware/index';
import { AppError, registerRoutes } from '../utils/index';
import { authRouter } from './auth/index';
import { healthRouter } from './health/index';
import { meRouter } from './me/index';

const router: Router = Router();

router.use(cors(corsOptions));

registerRoutes(router, [
    { prefix: '/auth', router: authRouter, skipJson: true },
    { prefix: '/health', router: healthRouter },
    { prefix: '/me', router: meRouter },
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
