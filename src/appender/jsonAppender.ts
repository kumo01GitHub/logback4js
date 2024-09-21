import { Appender, ILoggingEvent } from './appender';

/**
 * Appender whose log message type is JSON.
 */
export abstract class JsonAppender implements Appender {

    /**
     * Get log message.
     * @param {ILoggingEvent} event logging event
     * @returns {Object} JSON
     */
    public getMessage(event: ILoggingEvent): Object {
        return {
            logger: event.logger,
            timestamp: event.timestamp,
            level: event.level.label,
            message: event.message
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
