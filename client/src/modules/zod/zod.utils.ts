import { type ApiResponse, ErrorCodes } from '@casa/types';
import { z } from 'zod';

export function validateWithZod<T>(
    schema: z.ZodSchema<T>,
    data: unknown,
): ApiResponse<T> {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const fields: Record<string, string> = {};

    for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString() ?? 'form';
        fields[field] = issue.message;
    }

    return {
        success: false,
        error: {
            message: 'Validation failed',
            code: ErrorCodes.VALIDATION_ERROR,
            fields,
        },
    };
}
