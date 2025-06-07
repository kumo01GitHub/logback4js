import { Appender, type ILoggingEvent } from "@logback4js/core";


/**
 * Database Appender.
 */
export abstract class DatabaseAppender implements Appender {
    private static readonly DEFAULT_QUERY: string = "INSERT INTO log (logger, \"timestamp\", \"level\", \"message\") VALUES (${logger}, ${timestamp}, ${level}, ${message});";

    constructor(
        protected readonly query: string = DatabaseAppender.DEFAULT_QUERY
    ) { }

    /**
     * Get query using template.
     * @param {ILoggingEvent} event logging event
     * @returns {any} query
     */
    abstract getMessage(event: ILoggingEvent): any;

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
