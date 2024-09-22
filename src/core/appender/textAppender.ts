import { Appender, ILoggingEvent } from './appender';

/**
 * Appender whose log message type is text.
 */
export abstract class TextAppender implements Appender {

    constructor(
        private template: string = "[${logger}:${level}] ${timestamp} - ${message}"
    ) { }

    /**
     * Get log message using template.
     * @param {ILoggingEvent} event logging event
     * @returns {string} message
     */
    public getMessage(event: ILoggingEvent): string {
        return this.template
            .replace(/\$\{logger\}/g, event.logger)
            .replace(/\$\{timestamp\}/g, event.timestamp.toString())
            .replace(/\$\{level\}/g, event.level.label)
            .replace(/\$\{message\}/g, event.message)
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
