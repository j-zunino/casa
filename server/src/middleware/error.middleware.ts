import { AppError } from '@/utils';
import type { ApiResponse } from '@casa/types';
import { ErrorCodes } from '@casa/types';
import { isAPIError } from 'better-auth/api';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const normalizeBetterAuth = (message: string) =>
    message.replace(/\borganization\b/gi, 'house');

const mapBetterAuthCode = (status?: number) => {
    switch (status) {
        case 400:
            return ErrorCodes.BAD_REQUEST;
        case 401:
            return ErrorCodes.NOT_AUTHENTICATED;
        case 403:
            return ErrorCodes.FORBIDDEN;
        case 404:
            return ErrorCodes.NOT_FOUND;
        case 409:
            return ErrorCodes.CONFLICT;
        default:
            return ErrorCodes.INTERNAL_ERROR;
    }
};

/**
 * Error-handling middleware.
 * Converts thrown errors into a standardized {@link ApiResponse}
 *
 * @param error - The thrown error.
 * @param _req - Express request object (unused).
 * @param res - Express response object.
 * @param _next - Express next function (unused).
 */
export const errorMiddleware = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));

        return res.status(400).json({
            success: false,
            error: {
                message: 'validation failed',
                code: ErrorCodes.VALIDATION_ERROR,
                errors,
            },
        });
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            error: {
                message: error.message,
                code: error.code,
                errors: error.errors,
            },
        });
    }

    if (isAPIError(error)) {
        console.log(error);

        const message = normalizeBetterAuth(
            error.body?.message ?? error.message ?? 'something went wrong',
        );

        return res.status(error.statusCode ?? 400).json({
            success: false,
            error: {
                message: message,
                code: mapBetterAuthCode(error.statusCode),
            },
        });
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR]', error);
    }

    return res.status(500).json({
        success: false,
        error: {
            message: 'something went wrong',
            code: ErrorCodes.INTERNAL_ERROR,
        },
    });
};
