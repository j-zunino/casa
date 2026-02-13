import { CorsOptions } from 'cors';
import { env } from './env.ts';

export const corsOptions: CorsOptions = {
    credentials: true,
    origin: (origin: string | undefined, callback: Function) => {
        if (!origin || env.CORS_WHITELIST.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
