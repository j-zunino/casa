import { ErrorCodes } from '@casa/shared';
import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../../utils/index';
import { auth } from './auth';

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const session = await auth.api.getSession({
        headers: {
            cookie: req.headers.cookie,
            authorization: req.headers.authorization,
        },
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
};
