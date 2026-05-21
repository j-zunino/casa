import { houseSchema } from '@casa/schemas';
import z from 'zod';

import type { authClient } from '@/features/auth/auth.client';

export interface HouseContext {
    active: House | null;
    list: House[];
    isLoading: boolean;
}

export type House = typeof authClient.$Infer.Organization;
export type Member = typeof authClient.$Infer.Member;
export type Invitation = typeof authClient.$Infer.Invitation;

export type HouseDto = z.infer<typeof houseSchema>;
