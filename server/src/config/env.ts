import { z } from 'zod';

process.loadEnvFile();
const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    DB_URL: z.url(),
    CORS_WHITELIST: z
        .string()
        .transform((urls) => urls.split(',').map((url) => url.trim()))
        .pipe(z.array(z.url())),
});

export const env = envSchema.parse(process.env);
