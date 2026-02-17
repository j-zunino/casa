import { ErrorCodes } from '@casa/shared';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Server } from 'http';
import { corsOptions, env } from './config/index.ts';
import { errorMiddleware } from './middleware/index.ts';
import { AppError } from './utils/index.ts';

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cors(corsOptions));

// Health check endpoint.
app.get('/health', (_req: Request, res: Response): void => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (_req: Request, res: Response): void => {
    res.json({ message: 'Hello world' });
});

// Handle 404
app.use((req, _res, next) => {
    next(
        new AppError(
            `Route ${req.originalUrl} not found`,
            404,
            ErrorCodes.NOT_FOUND,
        ),
    );
});

app.use(errorMiddleware);

const server: Server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try a different port`);
        process.exit(1);
    }
    throw error;
});

/**
 * Gracefully shuts down the server when receiving termination signals.
 * @param {string} signal - The termination signal received
 */
function gracefulShutdown(signal: string): void {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
        console.error(
            'Could not close connections in time, forcefully shutting down',
        );
        process.exit(1);
    }, 10000);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
