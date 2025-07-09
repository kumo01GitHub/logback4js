import { type Appender, type ILoggingEvent } from "./appender";

/**
 * Appender whose log message type is JSON.
 */
export abstract class JsonAppender implements Appender {
  private static readonly DEFAULT_TEMPLATE = {
    logger: "${logger}",
    timestamp: "${timestamp}",
    level: "${level}",
    message: "${message}",
  };

  /**
   * JSON appender.
   * @param {{ [key: string]: string }} template Log message template.
   */
  constructor(
    private template: { [key: string]: string } = JsonAppender.DEFAULT_TEMPLATE
  ) {}

  /**
   * Get log message.
   * @param {ILoggingEvent} event logging event
   * @returns {object} JSON
   */
  public getMessage(event: ILoggingEvent): object {
    const msg = Object.create(this.template);
    Object.keys(this.template).forEach((key) => {
      msg[key] = this.template[key]
        .replace(/\$\{\s*logger\s*\}/g, event.logger)
        .replace(/\$\{\s*timestamp\s*\}/g, event.timestamp.toISOString())
        .replace(/\$\{\s*level\s*\}/g, event.level.label)
        .replace(/\$\{\s*message\s*\}/g, event.message)
        .replace(/\$\{\s*appender\s*\}/g, this.name);
    });

    return msg;
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
