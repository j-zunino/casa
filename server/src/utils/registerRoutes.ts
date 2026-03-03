import express, { type Router } from 'express';

export type ModuleRouter = {
    prefix: string;
    router: Router;
    skipJson?: boolean;
};

/**
 * Registers multiple module routers to a parent Express router.
 *
 * Function for feature-based routing: each module
 * exports its own router, and this function mounts them all under
 * their respective prefixes.
 *
 * @param appRouter - The main Express Router instance to register routes on.
 * @param modules - An array of module routers, each with a prefix and a router.
 *
 * @example
 * ```ts
 * import { Router } from 'express';
 * import { registerRoutes } from '../utils/index.ts';
 * import { authRouter } from './auth/index.ts';
 * import { taskRouter } from './task/index.ts';
 *
 * const router: Router = Router();
 *
 * registerRoutes(router, [
 *     { prefix: '/auth', router: authRouter, skipJson: true },
 *     { prefix: '/tasks', router: taskRouter },
 * ]);
 *
 * export { router as mainRouter };
 * ```
 */
export function registerRoutes(appRouter: Router, modules: ModuleRouter[]) {
    for (const module of modules) {
        if (!module.skipJson) {
            appRouter.use(module.prefix, express.json({ limit: '10kb' }));
        }

        appRouter.use(module.prefix, module.router);
    }
}
