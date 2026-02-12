import { z } from 'zod';

process.loadEnvFile();
const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    DB_URL: z.url(),
});

export const env = envSchema.parse(process.env);
