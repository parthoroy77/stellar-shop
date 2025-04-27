import Redis from "ioredis";

export class RedisClient {
  private static instance: RedisClient | null = null;
  private client: Redis;

  private constructor(redisUrl: string) {
    this.client = new Redis(redisUrl);
  }

  public static getInstance(): RedisClient | null {
    if (process.env.USE_REDIS !== "true") return null;

    if (!this.instance) {
      this.instance = new RedisClient(process.env.REDIS_URL as string);
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
