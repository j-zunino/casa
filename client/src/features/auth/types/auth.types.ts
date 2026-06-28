import type { signInSchema, signUpSchema } from "@casa/schemas";
import type { z } from "zod";
import type { authClient } from "../auth.client";

export type User = typeof authClient.$Infer.Session.user;
export type Session = typeof authClient.$Infer.Session.session;

export type SignUpDto = z.infer<typeof signUpSchema>;
export type SignInDto = z.infer<typeof signInSchema>;
