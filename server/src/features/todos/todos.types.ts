import type { createTodoSchema, updateTodoSchema } from "@casa/schemas";
import type z from "zod";

export type CreateTodo = z.infer<typeof createTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
