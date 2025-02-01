import Redis, { RedisOptions } from "ioredis";

export const createRedisClient = (config?: RedisOptions) => {
  const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    password: process.env.REDIS_PASSWORD,
    ...config,
  };

  const redis = new Redis(redisConfig);
  return redis;
};
