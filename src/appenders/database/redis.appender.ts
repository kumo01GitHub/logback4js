import { ILoggingEvent } from "@logback4js/core";
import { DatabaseAppender } from "./database.appender";
import { createClient } from "redis";

/**
 * Redis Appender.
 * @extends DatabaseAppender
 * @see {@link https://redis.io/docs/latest/develop/clients/nodejs/|node-redis}
 */
export class RedisAppender extends DatabaseAppender {
  private static readonly DEFAULT_TEMPLATE: string =
    "[${logger}:${level}] ${timestamp} - ${message}";

  /**
   * Redis Appender.
   * @see {@link DatabaseAppender}
   */
  constructor(
    url: string,
    private key: string,
    template: string = RedisAppender.DEFAULT_TEMPLATE
  ) {
    super(url, template);
  }

  public getMessage(event: ILoggingEvent): string {
    return this.query
      .replace(/\$\{\s*logger\s*\}/g, event.logger)
      .replace(/\$\{\s*timestamp\s*\}/g, event.timestamp.toString())
      .replace(/\$\{\s*level\s*\}/g, event.level.label)
      .replace(/\$\{\s*message\s*\}/g, event.message)
      .replace(/\$\{\s*appender\s*\}/g, this.name);
  }

  public get name(): string {
    return this.key;
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      const url: string = this.url;
      const client = createClient({ url });
      client.connect().then(() => {
        client.rPush(this.key, this.getMessage(event)).finally(() => {
          client.close();
        });
      });
    }
  }
}
