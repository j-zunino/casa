import type { ApiResponse } from '@casa/shared';
import { ErrorCodes } from '@casa/shared';
import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/index.ts';

/**
 * Error-handling middleware.
 * Converts thrown errors into a standardized {@link ApiResponse}
 *
 * @param error - The thrown error.
 * @param _req - Express request object (unused).
 * @param res - Express response object.
 * @param _next - Express next function (unused).
 */
export function errorMiddleware(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    if (error instanceof AppError) {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[AppError] ${error.code}: ${error.message}`);
        }

        const response: ApiResponse<never> = {
            success: false,
            error: {
                message: error.message,
                code: error.code,
            },
        };

        return res.status(error.statusCode).json(response);
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error('[ERROR]', (error as Error).message);
    }

    const response: ApiResponse<never> = {
        success: false,
        error: {
            message: 'Something went wrong',
            code: ErrorCodes.INTERNAL_ERROR,
        },
    };

    return res.status(500).json(response);
}
