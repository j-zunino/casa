import { ErrorCodes } from "@casa/types";
import { roleDefinitions } from "./auth";

export const mapBetterAuthError = (status?: number) => {
    switch (status) {
        case 400:
            return ErrorCodes.BAD_REQUEST;
        case 401:
            return ErrorCodes.NOT_AUTHENTICATED;
        case 403:
            return ErrorCodes.FORBIDDEN;
        case 404:
            return ErrorCodes.NOT_FOUND;
        case 409:
            return ErrorCodes.CONFLICT;
        default:
            return ErrorCodes.INTERNAL_ERROR;
    }
};

export const getRolePermissions = (role: string) => {
    const entry = roleDefinitions[role as keyof typeof roleDefinitions];
    return entry?.statements ?? {};
};
