import prisma from "@repo/prisma/client";
import logger from "../logger";

const sessionCleanup = async () => {
  try {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
    logger.info("Expired session cleared successfully");
  } catch (error) {
    logger.error("Session cleanup failed");
  }
};

const refreshTokenCleanup = async () => {
  try {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
    logger.info("Expired refresh tokens cleared");
  } catch (error) {
    logger.error("Refresh token cleanup failed");
  }
};

setInterval(() => {
  sessionCleanup();
}, 86400000);

setInterval(() => {
  refreshTokenCleanup();
}, 604800000);

export { sessionCleanup, refreshTokenCleanup };
