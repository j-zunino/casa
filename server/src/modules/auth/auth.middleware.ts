import { ErrorCodes } from '@casa/types';
import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../../utils/index';
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
                    'Not authenticated',
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
