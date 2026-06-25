import { Request, Response, Router } from "express";

export const router: Router = Router();

router.get("/", (_req: Request, res: Response) => {
    res.json({
        success: true,
        data: {
            status: "ok",
            timestamp: new Date().toISOString(),
        },
    });
});
