import { requireAuth } from "@/features/auth";
import { Router } from "express";

import type { ApiResponse } from "@casa/types";
import type { Request, Response } from "express";

export const router: Router = Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
    const { user } = res.locals;

    const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
    };

    res.json(response);
});
