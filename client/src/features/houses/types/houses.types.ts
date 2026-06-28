import type { authClient } from "@/features/auth/auth.client";
import type { houseSchema } from "@casa/schemas";
import type { z } from "zod";

export type House = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;
export type Role = typeof authClient.$Infer.Member.role;

export type HouseDto = z.infer<typeof houseSchema>;
