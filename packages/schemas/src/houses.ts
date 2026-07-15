import { z } from "zod";

export const houseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { error: "name is required" })
        .max(50, { error: "name is too long" })
        .regex(/^[\p{L}0-9_.,\s'-]+$/u, {
            error: "name can only contain letters, numbers, spaces, dots, commas, hyphens and underscores",
        }),
    logo: z.string().url().or(z.literal("")).optional(),
});
