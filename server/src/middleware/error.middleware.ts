import type { ApiResponse } from '@casa/types';
import { ErrorCodes } from '@casa/types';
import type { NextFunction, Request, Response } from 'express';
import { AppError } from '@/utils';

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
    if (error instanceof SyntaxError && 'body' in error) {
        const response: ApiResponse<never> = {
            success: false,
            error: {
                message: 'Invalid JSON',
                code: ErrorCodes.BAD_REQUEST,
            },
        };

        return res.status(400).json(response);
    }

    if (error instanceof AppError) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[AppError] ${error.code}: ${error.message}`);
        }

        const response: ApiResponse<never> = {
            success: false,
            error: {
                message: error.message,
                code: error.code,
                errors: error.errors,
            },
        };

        return res.status(error.statusCode).json(response);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR]', error);
    }

    const response: ApiResponse<never> = {
        success: false,
        error: {
            message: 'Something went wrong',
            code: ErrorCodes.INTERNAL_ERROR,
        },
    };

    return res.status(500).json(response);
};
