import express from 'express';
import { Server } from 'http';
import { env } from './config/index';
import { mainRouter } from './modules/index';

const app = express();
const PORT = env.PORT;

app.use('/api', mainRouter);

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
function gracefulShutdown(signal: string) {
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
