import { prisma } from "@/config";
import { AppError } from "@/utils";
import { ErrorCodes } from "@casa/types";

export const getHouseBySlug = async (slug: string) => {
    const house = await prisma.house.findUnique({
        where: { slug },
        select: { id: true },
    });

    if (!house) {
        throw new AppError("house not found", 404, ErrorCodes.NOT_FOUND);
    }

    return house;
};

export const normalizeHouseError = (message: string) =>
    message.replace(/\borganization\b/gi, "house");
