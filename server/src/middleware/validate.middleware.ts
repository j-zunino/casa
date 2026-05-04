import type { NextFunction, Request, Response } from 'express';
import { type ZodType } from 'zod';

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
        schema
            .parseAsync(req[target])
            .then((validated) => {
                (req as any)[target] = validated;
                next();
            })
            .catch(next);
    };
