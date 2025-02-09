import { createClient, RedisClientType } from "redis";

export class Pubsubmanager {
  private static instance: Pubsubmanager;
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>;

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance(): Pubsubmanager {
    if (!Pubsubmanager.instance) {
      Pubsubmanager.instance = new Pubsubmanager();
    }
    return Pubsubmanager.instance;
  }

  Subscribe() {}

  Unsubscribe() {}
}
