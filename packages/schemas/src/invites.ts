import { z } from 'zod';

export const inviteLinkSchema = z.object({
    maxUses: z.number().int().positive().optional(),
});
