import { prisma } from "@/config";
import { AppError } from "@/utils";
import { ErrorCodes } from "@casa/types";
import { housesServices } from "../houses/houses.services";
import { auth } from "./auth";

import type { NextFunction, Request, Response } from "express";

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session) {
            return next(
                new AppError(
                    "not authenticated",
                    401,
                    ErrorCodes.NOT_AUTHENTICATED,
                ),
            );
        }

        res.locals.user = session.user;
        res.locals.session = session.session;

        next();
    } catch (err) {
        next(err);
    }
};

export const requirePermission =
    (permissions: Record<string, string[]>, message?: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { houseSlug } = req.params;

        if (typeof houseSlug !== "string") {
            return next(
                new AppError("invalid house slug", 400, ErrorCodes.BAD_REQUEST),
            );
        }

        const house = await housesServices.getHouse(prisma, {
            where: { slug: houseSlug },
        });

        const { success } = await auth.api.hasPermission({
            headers: req.headers,
            body: { organizationId: house.id, permissions },
        });

        if (!success) {
            return next(
                new AppError(
                    message ?? "insufficient permissions",
                    403,
                    ErrorCodes.FORBIDDEN,
                ),
            );
        }

        next();
    };
