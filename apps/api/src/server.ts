/* eslint-disable no-console */
import prisma from "@repo/prisma/client";
import { createRedisClient } from "@repo/redis-config";
import colors from "colors";
import { Server } from "http";
import { Redis } from "ioredis";
import app from "./app";
import config from "./app/config";
import logger from "./app/logger";
import pingServer from "./app/utils/pingServer";

let server: Server;
let redis: Redis | null = null;

async function main() {
  try {
    // Connect to the database
    await prisma.$connect();

    // Initialize Redis
    redis = createRedisClient();

    redis.on("connect", () => {
      logger.info(colors.green.bold("Redis connected successfully ✔️"));
    });

    redis.on("error", (err) => {
      logger.error(colors.red.bold("Redis connection error:"), err);
    });

    // Start the server
    server = app.listen(config.port, () => {
      logger.info(colors.green.bold(`Server listening on port ${config.port} ✔️`));
    });
    pingServer();
  } catch (error) {
    logger.error(colors.red.bold("Error connecting to database:"), error);
    cleanup();
  }
}

// Handle unhandledRejection
process.on("unhandledRejection", (error) => {
  logger.error(colors.red.bold("Unhandled Rejection Error:"), error);
  if (server) {
    server.close(() => {
      prisma.$disconnect();
      process.exit(1);
    });
  } else {
    cleanup();
  }
});

// Handle uncaughtException
process.on("uncaughtException", (error) => {
  logger.error(colors.red.bold("Uncaught Exception Error:"), error);
  if (server) {
    server.close(() => {
      prisma.$disconnect();
      process.exit(1);
    });
  } else {
    cleanup();
  }
});

function cleanup() {
  if (redis) {
    redis.disconnect();
  }
  prisma.$disconnect();
  process.exit(1);
}

main();
