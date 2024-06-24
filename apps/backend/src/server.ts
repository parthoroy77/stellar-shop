/* eslint-disable no-console */
import prisma from "@repo/prisma/client";
import colors from "colors";
import { Server } from "http";
import app from "./app";
import config from "./app/config";
let server: Server;

async function main() {
  try {
    await prisma.$connect();
    server = app.listen(config.port, () => {
      console.log(
        colors.green.bold(`Server listening on port ${config.port} ✔️`)
      );
    });
  } catch (error) {
    console.error(colors.red.bold("Error connecting to database:"), error);
    process.exit(1);
  }
}

main();

// Handle unhandledRejection
process.on("unhandledRejection", (error) => {
  console.error(colors.red.bold("Unhandled Rejection Error:"), error);
  if (server) {
    server.close(() => {
      prisma.$disconnect();
      process.exit(1);
    });
  } else {
    prisma.$disconnect();
    process.exit(1);
  }
});

// Handle uncaughtException
process.on("uncaughtException", (error) => {
  console.error(colors.red.bold("Uncaught Exception Error:"), error);
  if (server) {
    server.close(() => {
      prisma.$disconnect();
      process.exit(1);
    });
  } else {
    prisma.$disconnect();
    process.exit(1);
  }
});
