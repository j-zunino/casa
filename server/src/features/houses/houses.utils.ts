import { houseSchema } from "@casa/schemas";
import { ErrorCodes } from "@casa/types";
import { APIError } from "better-auth";
import slugify from "slugify";

export const normalizeHouseError = (message: string) => {
    message.replace(/\borganization\b/gi, "house");
};

export const parseHouseName = (rawName: string) => {
    const result = houseSchema.safeParse({ name: rawName });
    if (!result.success) {
        throw new APIError(ErrorCodes.BAD_REQUEST, {
            message: result.error.issues[0]?.message ?? "invalid input",
        });
    }

    return result.data.name;
};

export const generateSlug = (name: string) => {
    return slugify(name, { lower: true, strict: true, trim: true });
};
