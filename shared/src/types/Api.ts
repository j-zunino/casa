/**
 * All possible application-level error codes.
 *
 * These codes are shared between the client and server
 * to allow type-safe error handling.
 */
export const ErrorCodes = {
    NOT_FOUND: 'NOT_FOUND',
    FORBIDDEN: 'FORBIDDEN',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export type ApiError = {
    message: string;
    code: ErrorCode;
};

export type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; error: ApiError };
