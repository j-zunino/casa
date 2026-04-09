import { authClient } from '@/modules/auth/auth.client.ts';

export interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface HouseContext {
    active: House | null;
    list: House[];
    isLoading: boolean;
}

export type User = typeof authClient.$Infer.Session.user;
export type Session = typeof authClient.$Infer.Session.session;
export type House = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;
export type Invitation = typeof authClient.$Infer.Invitation;
