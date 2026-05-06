import { ErrorCodes } from '@casa/types';
import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    message: {
        success: false,
        error: {
            message: 'too many requests, please try again later.',
            code: ErrorCodes.TOO_MANY_REQUESTS,
        },
    },
});
