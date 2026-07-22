import { corsOptions, limiter } from "@/config";
import { errorMiddleware } from "@/middleware";
import { AppError, registerRoutes } from "@/utils";
import { ErrorCodes } from "@casa/types";
import cors from "cors";
import { Router } from "express";
import helmet from "helmet";

import { authRouter } from "./auth";
import { healthRouter } from "./health";
import { housesRouter } from "./houses";
import { invitesRouter } from "./invites";
import { meRouter } from "./me";
import { todosRouter } from "./todos";

import type { NextFunction, Request, Response } from "express";

const router: Router = Router();

router.use(limiter);
router.use(helmet());
router.use(cors(corsOptions));

registerRoutes(router, [
    { prefix: "/auth", router: authRouter, skipJson: true },
    { prefix: "/health", router: healthRouter },
    { prefix: "/houses", router: housesRouter },
    { prefix: "/me", router: meRouter },
    { prefix: "/invites", router: invitesRouter },
    { prefix: "/houses/:houseSlug/todos", router: todosRouter },
]);

// Handle 404 routes
router.use((req: Request, res: Response, next: NextFunction) => {
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
