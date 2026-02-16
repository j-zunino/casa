export const ErrorCodes = {
    NOT_FOUND: 'NOT_FOUND',
    FORBIDDEN: 'FORBIDDEN',
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
