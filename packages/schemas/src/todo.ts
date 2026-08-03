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
    dueDate: z.coerce.date().optional(),
    subTasks: z
        .array(
            z
                .string()
                .trim()
                .min(1, { message: "sub task title is required" })
                .max(200, { message: "sub task title is too long" }),
        )
        .max(30, { message: "too many sub tasks" })
        .optional(),
});

export const updateTodoSchema = createTodoSchema
    .partial()
    .extend({ isCompleted: z.boolean().optional() });
