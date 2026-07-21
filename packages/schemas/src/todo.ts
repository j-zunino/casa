import { z } from "zod";

const visibilitySchema = z.enum(["PUBLIC", "PRIVATE"]);

export const createTodoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "title is required" })
        .max(200, { message: "title is too long" }),
    description: z.string().trim().max(1000).optional(),
    visibility: visibilitySchema.default("PRIVATE"),
});

export const updateTodoSchema = createTodoSchema.extend({
    isCompleted: z.boolean().optional(),
});
