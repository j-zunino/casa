import { ErrorCodes } from '@casa/types';
import type { NextFunction, Request, Response } from 'express';
import { z, type ZodType } from 'zod';
import { AppError } from '../utils';

export type ValidateTarget = 'body' | 'query' | 'params';

type ValidateOptions = {
    target?: ValidateTarget;
};

/**
 * Middleware that validates request data using a Zod schema.
 *
 * @param schema - The Zod schema to validate against
 * @param options - Validation options
 * @param options.target - Which request property to validate (default: 'body')
 * @returns Express middleware function
 *
 * @example
 * ```ts
 * router.post('/', validate(schema), (req, res) => {
 *   const { value } = req.body as z.infer<typeof schema>;
 * });
 * ```
 */
export const validate =
    <T extends ZodType>(schema: T, { target = 'body' }: ValidateOptions = {}) =>
    (req: Request, _res: Response, next: NextFunction) => {
        try {
            const validated = schema.parse(req[target]);
            (req as any)[target] = validated;

            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                }));

                return next(
                    new AppError(
                        'Validation failed',
                        400,
                        ErrorCodes.VALIDATION_ERROR,
                        errors,
                    ),
                );
            }

            next(error);
        }
    };
