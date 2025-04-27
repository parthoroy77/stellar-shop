import Redis, { RedisOptions } from "ioredis";

export class RedisClient {
  private static instance: RedisClient | null = null;
  private client: Redis;

  private constructor(config: RedisOptions) {
    this.client = new Redis(config);
  }

  public static getInstance(): RedisClient | null {
    if (process.env.USE_REDIS !== "true") return null;

    if (!this.instance) {
      this.instance = new RedisClient({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379", 10),
        password: process.env.REDIS_PASSWORD || undefined,
      });
    }

    return this.instance;
  }

  public getClient(): Redis {
    return this.client;
  }

  public async disconnect(): Promise<void> {
    await this.client.quit();
    RedisClient.instance = null;
  }
}
