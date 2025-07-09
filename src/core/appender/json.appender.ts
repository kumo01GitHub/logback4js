import { type Appender, type ILoggingEvent } from "./appender";

/**
 * Appender whose log message type is JSON.
 */
export abstract class JsonAppender implements Appender {
  /**
   * JSON appender.
   * @param {{ [key: string]: any }} template Log message template.
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private template?: { [key: string]: any }
  ) {}

  /**
   * Get log message.
   * @param {ILoggingEvent} event logging event
   * @returns {object} JSON
   */
  public getMessage(event: ILoggingEvent): object {
    if (this.template) {
      const msg = Object.create(this.template);

      Object.keys(this.template).forEach((key) => {
        msg[key] = this.template![key];
        if (typeof msg[key] === "string") {
          msg[key] = msg[key]
            .replace(/\$\{\s*logger\s*\}/g, event.logger)
            .replace(/\$\{\s*timestamp\s*\}/g, event.timestamp.toISOString())
            .replace(/\$\{\s*level\s*\}/g, event.level.label)
            .replace(/\$\{\s*message\s*\}/g, event.message)
            .replace(/\$\{\s*appender\s*\}/g, this.name);
        }
      });

      return msg;
    } else {
      return {
        logger: event.logger,
        timestamp: event.timestamp,
        level: event.level.label,
        message: event.message,
      };
    }
  }

  /**
   * Appender name. Logger uses for key to manage Appenders.
   */
  abstract get name(): string;

  /**
   * Do append.
   * @param {ILoggingEvent} event Logging event.
   */
  abstract doAppend(event: ILoggingEvent): void;
}
