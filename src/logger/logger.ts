import { Appender } from '../appender/appender';

/**
 * Manage and log Appenders.
 */
export interface Logger {
    /**
     * Logger name.
     */
    get name(): string;

    /**
     * Add Appender from Logger.
     * @param {Appender} appender 
     */
    addAppender(appender: Appender): void;

    /**
     * Remove Appender from Logger.
     * @param {string} name Appender name. 
     */
    removeAppender(name: string): void;

    /**
     * Appender names.
     */
    get appenders(): string[];

    /**
     * Trace log.
     * @param {string} message Log message. 
     */
    trace(message: string): void;

    /**
     * Debug log.
     * @param {string} message Log message. 
     */
    debug(message: string): void;

    /**
     * Information log.
     * @param {string} message Log message. 
     */
    info(message: string): void;

    /**
     * Warning log.
     * @param {string} message Log message. 
     */
    warn(message: string): void;

    /**
     * Error log.
     * @param {string} message Log message. 
     */
    error(message: string): void;
}
