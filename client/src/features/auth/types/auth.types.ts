import { signInSchema, signUpSchema } from "@casa/schemas";
import z from "zod";

import type { authClient } from "../auth.client";

export interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export type User = typeof authClient.$Infer.Session.user;
export type Session = typeof authClient.$Infer.Session.session;

export type SignUpDto = z.infer<typeof signUpSchema>;
export type SignInDto = z.infer<typeof signInSchema>;
