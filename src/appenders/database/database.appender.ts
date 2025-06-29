import { Appender, type ILoggingEvent } from "@logback4js/core";
import { basename } from "node:path";

/**
 * Database Appender.
 */
export abstract class DatabaseAppender implements Appender {
  private static readonly DEFAULT_QUERY: string =
    'INSERT INTO log (logger, "timestamp", "level", "message") VALUES (${logger}, ${timestamp}, ${level}, ${message});';
  private readonly _name: string;

  /**
   * Database Appender.
   * @param {string} url Database URL.
   * @param {string} query Query template.
   */
  constructor(
    protected readonly url: string,
    protected readonly query: string = DatabaseAppender.DEFAULT_QUERY
  ) {
    this._name = basename(url);
  }

  /**
   * Get query using template.
   * @param {ILoggingEvent} event logging event
   * @returns {any} query
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract getMessage(event: ILoggingEvent): any;

  /**
   * Appender name. Logger uses for key to manage Appenders.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Do append.
   * @param {ILoggingEvent} event Logging event.
   */
  abstract doAppend(event: ILoggingEvent): void;
}
