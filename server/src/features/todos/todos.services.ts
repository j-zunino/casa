import { getRolePermissions } from "@/features/auth";
import { housesServices } from "@/features/houses/houses.services";
import { AppError } from "@/utils";
import { ErrorCodes } from "@casa/types";
import crypto from "node:crypto";
import { todosQueries } from "./todos.queries";

import type { Client } from "@/config";
import type { Visibility } from "@/generated/prisma/enums";
import type { CreateTodo, UpdateTodo } from "./todos.types";

export const todosServices = {
    async listTodos(
        client: Client,
        slug: string,
        userId: string,
        page: number,
        limit: number,
    ) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        const member = await housesServices.getMember(client, userId, slug);
        const permissions = getRolePermissions(member.role);
        const canReadAny = permissions.todo?.includes("read:any");

        const skip = (page - 1) * limit;

        const where = canReadAny
            ? { houseId: house.id }
            : {
                  houseId: house.id,
                  OR: [
                      { visibility: "PUBLIC" as Visibility },
                      { createdById: userId },
                  ],
              };

        const [todos, total] = await Promise.all([
            todosQueries.findMany(client, {
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            todosQueries.count(client, where),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            todos,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrevious: page > 1,
            },
        };
    },

    async getTodo(client: Client, id: string, slug: string, userId: string) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        const todo = await todosQueries.findUnique(client, {
            where: { id },
        });

        if (!todo || todo.houseId !== house.id) {
            throw new AppError("todo not found", 404, ErrorCodes.NOT_FOUND);
        }

        if (todo.visibility === "PRIVATE" && todo.createdById !== userId) {
            const member = await housesServices.getMember(client, userId, slug);
            const permissions = getRolePermissions(member.role);
            if (!permissions.todo?.includes("read:any")) {
                throw new AppError("todo not found", 404, ErrorCodes.NOT_FOUND);
            }
        }

        return todo;
    },

    async createTodo(
        client: Client,
        slug: string,
        userId: string,
        data: CreateTodo,
    ) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        return todosQueries.create(client, {
            data: {
                id: crypto.randomUUID(),
                title: data.title,
                description: data.description ?? null,
                visibility: data.visibility ?? "PRIVATE",
                houseId: house.id,
                createdById: userId,
            },
        });
    },

    async updateTodo(
        client: Client,
        id: string,
        slug: string,
        userId: string,
        data: UpdateTodo,
    ) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        const todo = await todosQueries.findUnique(client, {
            where: { id },
        });

        if (!todo || todo.houseId !== house.id) {
            throw new AppError("todo not found", 404, ErrorCodes.NOT_FOUND);
        }

        if (todo.createdById !== userId) {
            const member = await housesServices.getMember(client, userId, slug);
            const permissions = getRolePermissions(member.role);
            if (!permissions.todo?.includes("update:any")) {
                throw new AppError(
                    "insufficient permissions",
                    403,
                    ErrorCodes.FORBIDDEN,
                );
            }
        }

        return todosQueries.update(client, {
            where: { id },
            data: { ...data, updatedById: userId },
        });
    },

    async deleteTodo(client: Client, id: string, slug: string, userId: string) {
        const house = await housesServices.getHouse(client, {
            where: { slug },
        });

        const todo = await todosQueries.findUnique(client, {
            where: { id },
        });

        if (!todo || todo.houseId !== house.id) {
            throw new AppError("todo not found", 404, ErrorCodes.NOT_FOUND);
        }

        if (todo.createdById !== userId) {
            const member = await housesServices.getMember(client, userId, slug);
            const permissions = getRolePermissions(member.role);
            if (!permissions.todo?.includes("delete:any")) {
                throw new AppError(
                    "insufficient permissions",
                    403,
                    ErrorCodes.FORBIDDEN,
                );
            }
        }

        return todosQueries.delete_(client, {
            where: { id },
        });
    },
};
