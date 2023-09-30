import Redis, { Redis as RedisClient } from "ioredis";
import ICacheProvider from "@domain/cache/data/ICacheProvider";
import ILogsData from "@domain/logs/data/ILogsData";
import NewRelicLogsProvider from "@providers/newRelic/logs/NewRelicLogsProvider";
import { REDIS_HOST, REDIS_PORT } from "../../constants";

class RedisCacheProvider {
  client;
  static instance = new RedisCacheProvider();

  constructor() {
    this.client = new Redis({
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (retries) => {
        if (retries >= 3) return null;
        return retries;
      },
    });
  }

  static getInstance() {
    return RedisCacheProvider.instance;
  }

  async save(key, value, expireInSeconds = 600) {
    try {
      await this.client.set(key, JSON.stringify(value), "EX", expireInSeconds);
    } catch {
      throw new Error("Failed on save value on cache!");
    }
  }

  async recover(key) {
    const cacheData = await this.client.get(key);

    if (!cacheData) {
      return null;
    }

    return JSON.parse(cacheData);
  }

  async invalidate(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      throw new Error("Failed on invalidate cache!");
    }
  }
}

export default RedisCacheProvider;
