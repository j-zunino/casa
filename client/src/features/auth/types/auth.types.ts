import type { authClient } from '../auth.client';

export interface AuthContext {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

// TODO: Remove?
export interface AuthHouseContext {
    auth: AuthContext;
    house: HouseContext;
}

export type User = typeof authClient.$Infer.Session.user;
export type Session = typeof authClient.$Infer.Session.session;

// TODO: Move to features/houses/types
export interface HouseContext {
    active: House | null;
    list: House[];
    isLoading: boolean;
}

export type House = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;
export type Invitation = typeof authClient.$Infer.Invitation;
