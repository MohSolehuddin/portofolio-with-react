import { createClient } from "redis";

const globalForRedis = globalThis as unknown as {
  redisClient?: ReturnType<typeof createClient>;
};

export const redisClient = () => {
  if (!globalForRedis.redisClient) {
    const client = createClient({
      username: process.env.REDIS_USERNAME || "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      },
    });

    client.on("error", (err) => console.error("Redis Client Error", err));

    client.connect().catch(console.error);
    globalForRedis.redisClient = client;
  }

  return globalForRedis.redisClient;
};
