import { env } from "@/config";
import { mainRouter } from "@/modules";
import express from "express";

import type { Server } from "http";

const app = express();
const PORT = env.PORT;

app.use("/api", mainRouter);

const server: Server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server running at http://localhost:${PORT}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
        // eslint-disable-next-line no-console
        console.error(`port ${PORT} is already in use. Try a different port`);
        process.exit(1);
    }
    throw error;
});

/**
 * Gracefully shuts down the server when receiving termination signals.
 * @param {string} signal - The termination signal received
 */
const gracefulShutdown = (signal: string) => {
    // eslint-disable-next-line no-console
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(() => {
        // eslint-disable-next-line no-console
        console.log("Server closed.");
        process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
        // eslint-disable-next-line no-console
        console.error(
            "could not close connections in time, forcefully shutting down",
        );
        process.exit(1);
    }, 10000);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
