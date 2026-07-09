import { z } from "zod";

const envSchema = z.object({
    VITE_API_URL: z.url(),
    VITE_BETTER_AUTH_URL: z.url(),
    VITE_BETTER_AUTH_CALLBACK_URL: z.url(),
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
    const missing = result.error.issues
        .map((i) => i.path.join("."))
        .join(", ");
    throw new Error(
        `Missing or invalid environment variables: ${missing}. Check your .env file.`,
    );
}

export const env = result.data;
