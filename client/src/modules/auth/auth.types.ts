import { authClient } from './auth.client.ts';

export type User = typeof authClient.$Infer.Session.user;
export type Session = typeof authClient.$Infer.Session.session;
export type House = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;
export type Invitation = typeof authClient.$Infer.Invitation;
