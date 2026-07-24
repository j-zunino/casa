import { api } from "@/lib/api";
import { createTodoSchema, updateTodoSchema } from "@casa/schemas";

import type { House } from "@/features/houses/types";
import type { TodoDto } from "@casa/types";
import type { z } from "zod";

type CreateTodoData = z.input<typeof createTodoSchema>;
type UpdateTodoData = z.input<typeof updateTodoSchema>;

export const todosApi = {
    async getAll(houseSlug: House["slug"], page = 1, limit = 10) {
        return api<TodoDto[]>(`/houses/${houseSlug}/todos`, { page, limit });
    },

    async getById(houseSlug: House["slug"], id: string) {
        const { data } = await api<TodoDto>(`/houses/${houseSlug}/todos/${id}`);
        return data;
    },

    async create(houseSlug: House["slug"], data: CreateTodoData) {
        const { data: todo } = await api<TodoDto>(
            `/houses/${houseSlug}/todos`,
            {
                method: "POST",
                body: JSON.stringify(data),
            },
        );

        return todo;
    },

    async update(houseSlug: House["slug"], id: string, data: UpdateTodoData) {
        const { data: todo } = await api<TodoDto>(
            `/houses/${houseSlug}/todos/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            },
        );

        return todo;
    },

    async delete(houseSlug: House["slug"], id: string) {
        const { data } = await api<{ message: string }>(
            `/houses/${houseSlug}/todos/${id}`,
            { method: "DELETE" },
        );

        return data;
    },
};
