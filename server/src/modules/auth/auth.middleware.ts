import { AppError } from '@/utils';
import { ErrorCodes } from '@casa/types';
import { type NextFunction, type Request, type Response } from 'express';
import { auth } from './auth';

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session) {
            return next(
                new AppError(
                    'not authenticated',
                    401,
                    ErrorCodes.NOT_AUTHENTICATED,
                ),
            );
        }

        res.locals.user = session.user;
        res.locals.session = session.session;

        next();
    } catch (err) {
        next(err);
    }
};
