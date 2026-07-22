import { prisma } from "@/config";
import { createTodoSchema, updateTodoSchema } from "@casa/schemas";
import { Router } from "express";
import { requireAuth, requirePermission } from "../auth";
import { todosServices } from "./todos.services";

import type { ApiResponse } from "@casa/types";
import type { Request, Response } from "express";

export const router: Router = Router({ mergeParams: true });

router.get(
    "/",
    requireAuth,
    requirePermission({ todo: ["read"] }),
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const { houseSlug } = req.params;

        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(
            50,
            Math.max(1, parseInt(req.query.limit as string) || 10),
        );

        const { todos, pagination } = await todosServices.listTodos(
            prisma,
            houseSlug,
            res.locals.user.id,
            page,
            limit,
        );

        const response: ApiResponse<typeof todos> = {
            success: true,
            data: todos,
            pagination,
        };

        res.json(response);
    },
);

router.get(
    "/:id",
    requireAuth,
    requirePermission({ todo: ["read"] }),
    async (req: Request<{ houseSlug: string; id: string }>, res: Response) => {
        const { houseSlug, id } = req.params;

        const todo = await todosServices.getTodo(
            prisma,
            id,
            houseSlug,
            res.locals.user.id,
        );

        const response: ApiResponse<typeof todo> = {
            success: true,
            data: todo,
        };

        res.json(response);
    },
);

router.post(
    "/",
    requireAuth,
    requirePermission({ todo: ["create"] }),
    async (req: Request<{ houseSlug: string }>, res: Response) => {
        const { houseSlug } = req.params;
        const data = createTodoSchema.parse(req.body);

        const todo = await todosServices.createTodo(
            prisma,
            houseSlug,
            res.locals.user.id,
            data,
        );

        const response: ApiResponse<typeof todo> = {
            success: true,
            data: todo,
        };

        res.status(201).json(response);
    },
);

router.patch(
    "/:id",
    requireAuth,
    requirePermission({ todo: ["update"] }),
    async (req: Request<{ houseSlug: string; id: string }>, res: Response) => {
        const { houseSlug, id } = req.params;
        const data = updateTodoSchema.parse(req.body);

        const todo = await todosServices.updateTodo(
            prisma,
            id,
            houseSlug,
            res.locals.user.id,
            data,
        );

        const response: ApiResponse<typeof todo> = {
            success: true,
            data: todo,
        };

        res.json(response);
    },
);

router.delete(
    "/:id",
    requireAuth,
    requirePermission({ todo: ["delete"] }),
    async (req: Request<{ houseSlug: string; id: string }>, res: Response) => {
        const { houseSlug, id } = req.params;

        await todosServices.deleteTodo(
            prisma,
            id,
            houseSlug,
            res.locals.user.id,
        );

        const response: ApiResponse<{ message: string }> = {
            success: true,
            data: { message: "todo deleted" },
        };

        res.json(response);
    },
);
