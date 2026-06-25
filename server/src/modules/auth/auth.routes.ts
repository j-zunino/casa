import { toNodeHandler } from "better-auth/node";
import { Router } from "express";
import { auth } from "./auth";

export const router: Router = Router();

router.all("/{*any}", toNodeHandler(auth));
