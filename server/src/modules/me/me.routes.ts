import { requireAuth } from "@/modules/auth";
import type { ApiResponse } from "@casa/types";
import { type Request, type Response, Router } from "express";

export const router: Router = Router();

router.get("/", requireAuth, async (_req: Request, res: Response) => {
    const { user } = res.locals;

    const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
    };

    res.json(response);
});
