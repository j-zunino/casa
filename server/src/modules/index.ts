import { ErrorCodes } from '@casa/shared';
import cors from 'cors';
import { NextFunction, Request, Response, Router } from 'express';
import { corsOptions } from '../config/index.ts';
import { errorMiddleware } from '../middleware/index.ts';
import { AppError, registerRoutes } from '../utils/index.ts';
import { authRouter } from './auth/index.ts';
import { healthRouter } from './health/index.ts';

const router: Router = Router();

router.use(cors(corsOptions));

registerRoutes(router, [
    { prefix: '/auth', router: authRouter, skipJson: true },
    { prefix: '/health', router: healthRouter },
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
