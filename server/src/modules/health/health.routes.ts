import { Router } from "express";

import type { Request, Response } from "express";

export const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        success: true,
        data: {
            status: "ok",
            timestamp: new Date().toISOString(),
        },
    });
});
