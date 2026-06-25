import { z } from "zod";

process.loadEnvFile();
const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    DATABASE_URL: z.url(),
    CORS_WHITELIST: z
        .string()
        .transform((urls) => urls.split(",").map((url) => url.trim()))
        .pipe(z.array(z.url())),

    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
