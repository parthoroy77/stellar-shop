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
export let redisInstance: Redis | null = null;

async function main() {
  try {
    // Connect to the database
    await prisma.$connect();

    // TODO: Write proper redis config and uses (For current development it's fine.)
    if (config.use_redis) {
      // Initialize Redis
      redisInstance = createRedisClient();

      redisInstance.on("connect", () => {
        logger.info(colors.green.bold("Redis connected successfully ✔️"));
      });

      redisInstance.on("error", (err) => {
        logger.error(colors.red.bold("Redis connection error:"), err);
      });
    }

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
  if (redisInstance) {
    redisInstance.disconnect();
  }
  prisma.$disconnect();
  process.exit(1);
}

main();
