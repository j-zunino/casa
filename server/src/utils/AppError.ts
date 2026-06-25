import { ErrorCode } from "@casa/types";

/**
 * Represents an application-level operational error.
 *
 * This error should be thrown for expected failures
 * such as authentication, authorization, validation,
 * or missing resources.
 *
 * It is handled by the global error middleware and
 * converted into a standardized {@link ApiResponse}.
 *
 * @extends Error
 * @see errorMiddleware
 */
export class AppError extends Error {
    /** The HTTP status code to return. */
    public readonly statusCode: number;
    /** The error code for programmatic error handling. */
    public readonly code: ErrorCode;
    /** Optional field-level validation errors. */
    public readonly errors?: { path: string; message: string }[];

    /**
     * Creates an application error.
     *
     * @param message - Human-readable error message
     * @param statusCode - HTTP status code
     * @param code - Error code for programmatic handling
     * @param errors - Optional validation errors
     */
    constructor(
        message: string,
        statusCode: number,
        code: ErrorCode,
        errors?: { path: string; message: string }[],
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
