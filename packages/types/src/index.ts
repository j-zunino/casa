export const ErrorCodes = {
    BAD_REQUEST: "BAD_REQUEST",
    CONFLICT: "CONFLICT",
    FORBIDDEN: "FORBIDDEN",
    INTERNAL_ERROR: "INTERNAL_ERROR",
    NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
    NOT_FOUND: "NOT_FOUND",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export type ApiError = {
    message: string;
    code: ErrorCode;
    errors?: { path: string; message: string }[];
};

export type ApiPagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

export type ApiResponse<T> =
    | { success: true; data: T; pagination?: ApiPagination }
    | { success: false; error: ApiError };
