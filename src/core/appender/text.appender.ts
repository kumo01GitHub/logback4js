import { type Appender, type ILoggingEvent } from './appender';

/**
 * Appender whose log message type is text.
 */
export abstract class TextAppender implements Appender {
    private static readonly DEFAULT_TEMPLATE: string = "[${logger}:${level}] ${timestamp} - ${message}";

    constructor(
        private template: string = TextAppender.DEFAULT_TEMPLATE
    ) { }

    /**
     * Get log message using template.
     * @param {ILoggingEvent} event logging event
     * @returns {string} message
     */
    public getMessage(event: ILoggingEvent): string {
        return this.template
            .replace(/\$\{\s*logger\s*\}/g, event.logger)
            .replace(/\$\{\s*timestamp\s*\}/g, event.timestamp.toString())
            .replace(/\$\{\s*level\s*\}/g, event.level.label)
            .replace(/\$\{\s*message\s*\}/g, event.message);
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
