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
            ? { houseId: house.id, parentId: null }
            : {
                  houseId: house.id,
                  parentId: null,
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
                include: { subTasks: true },
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
            include: { subTasks: true },
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
                visibility: data.visibility ?? "PRIVATE",
                dueDate: data.dueDate,
                houseId: house.id,
                createdById: userId,
                ...(data.subTasks?.length
                    ? {
                          subTasks: {
                              create: data.subTasks.map((title) => ({
                                  id: crypto.randomUUID(),
                                  title,
                                  visibility: "PRIVATE" as Visibility,
                                  houseId: house.id,
                                  createdById: userId,
                              })),
                          },
                      }
                    : {}),
            },
            include: { subTasks: true },
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
            include: { subTasks: true },
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

        const isCompleting = data.isCompleted !== undefined;
        const isParent = todo.subTasks.length > 0;
        const isChild = todo.parentId !== null;

        if (isCompleting && (isParent || isChild)) {
            const updated = await todosQueries.update(client, {
                where: { id },
                data: {
                    title: data.title,
                    visibility: data.visibility,
                    isCompleted: data.isCompleted,
                    dueDate: data.dueDate,
                    updatedById: userId,
                },
                include: { subTasks: true },
            });

            if (isParent) {
                await todosQueries.update(client, {
                    where: { id },
                    data: {
                        title: data.title,
                        visibility: data.visibility,
                        isCompleted: data.isCompleted,
                        dueDate: data.dueDate,
                        updatedById: userId,
                        subTasks: {
                            updateMany: {
                                where: { parentId: id },
                                data: {
                                    isCompleted: data.isCompleted as boolean,
                                },
                            },
                        },
                    },
                    include: { subTasks: true },
                });

                return {
                    ...updated,
                    subTasks: updated.subTasks.map((subTask) => ({
                        ...subTask,
                        isCompleted: data.isCompleted as boolean,
                    })),
                };
            }

            const siblings = await todosQueries.findMany(client, {
                where: { parentId: todo.parentId },
            });

            const allComplete =
                (data.isCompleted as boolean) &&
                siblings.filter((s) => s.id !== id).every((s) => s.isCompleted);

            await todosQueries.update(client, {
                where: { id: todo.parentId },
                data: { isCompleted: allComplete, updatedById: userId },
                include: { subTasks: true },
            });

            return updated;
        }

        return todosQueries.update(client, {
            where: { id },
            data: {
                title: data.title,
                visibility: data.visibility,
                isCompleted: data.isCompleted,
                dueDate: data.dueDate,
                updatedById: userId,
                ...(data.subTasks !== undefined && {
                    subTasks: {
                        deleteMany: {},
                        create: data.subTasks.map((title) => ({
                            id: crypto.randomUUID(),
                            title,
                            visibility: "PRIVATE" as Visibility,
                            houseId: house.id,
                            createdById: userId,
                        })),
                    },
                }),
            },
            include: { subTasks: true },
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
