import { ILoggingEvent } from "@logback4js/core";
import { DatabaseAppender } from "./database.appender";
import { MongoClient } from "mongodb";

/**
 * MongoDB Appender.
 * @extends DatabaseAppender
 * @see {@link https://www.mongodb.com/docs/drivers/node/current/|The official MongoDB Node.js driver}
 */
export class MongoAppender extends DatabaseAppender {
  /**
   * MongoDB Appender. Ignore `query`.
   * @see {@link DatabaseAppender}
   */
  constructor(url: string, private collection: string) {
    super(url);
  }

  public getMessage(event: ILoggingEvent): object {
    return {
      logger: event.logger,
      timestamp: event.timestamp,
      level: event.level.label,
      message: event.message,
    };
  }

  public get name(): string {
    return this.collection;
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      const client = new MongoClient(this.url);
      client
        .db()
        .collection(this.collection)
        .insertOne(this.getMessage(event))
        .finally(() => {
          client.close();
        });
    }
  }
}
