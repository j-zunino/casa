import { ErrorCode } from '@casa/types';

/**
 * Represents an application-level operational error.
 *
 * This error should be thrown for expected failures
 * such as authentication, authorization, validation,
 * or missing resources.
 *
 * It is handled by the global error middleware and
 * converted into a standardized {@link ApiResponse}.
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: ErrorCode;

    /**
     * Creates a new AppError instance.
     *
     * @param message - Human-readable error message.
     * @param statusCode - HTTP status code (e.g., 400, 401, 404).
     * @param code - Application-specific error code.
     */
    constructor(message: string, statusCode: number, code: ErrorCode) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
