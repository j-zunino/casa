import { env } from "./env";

import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || env.CORS_WHITELIST.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("not allowed by CORS"));
        }
    },
};
