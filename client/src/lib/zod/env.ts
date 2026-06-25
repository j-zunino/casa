import { z } from "zod";

const envSchema = z.object({
    VITE_API_URL: z.url(),
    VITE_BETTER_AUTH_URL: z.url(),
    VITE_BETTER_AUTH_CALLBACK_URL: z.url(),
});

export const env = envSchema.parse(import.meta.env);
