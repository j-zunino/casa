import { CorsOptions } from 'cors';
import { env } from './env';

export const corsOptions: CorsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || env.CORS_WHITELIST.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'));
        }
    },
};
