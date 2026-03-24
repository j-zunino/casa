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
    fields?: Record<string, string>;
};

export type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; error: ApiError };
