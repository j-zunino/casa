import type { authClient } from '../auth.client';

export interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export type User = typeof authClient.$Infer.Session.user;
export type Session = typeof authClient.$Infer.Session.session;
