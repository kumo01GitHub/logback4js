import { Logger } from "./logger";
import { Appender } from "../appender/appender";
import { ConsoleAppender } from "../appender/console.appender";
import { LogLevel } from "../types/loglevel";

/**
 * Interface to add Logger.
 */
export interface ILogger {
    /** Logger name. */
    name: string,
    /** Log level. */
    level: LogLevel,
    /** Appenders. */
    appenders?: Appender[]
}

/**
 * Logger Factory.
 */
export class LoggerFactory {
    /**
     * Root Logger name.
     * @readonly
     */
    public static readonly ROOT_LOGGER_NAME: string = "root";

    /**
     * Loggers.
     */
    private static loggers: Map<string, Logger> = new Map<string, Logger>();

    /**
     * @constructor
     * @param {LogLevel} rootLoglevel Root Logger's log level. Default value is Trace.
     */
    constructor(
        rootLoglevel: LogLevel = LogLevel.Trace
    ) {
        // Initialize Root Logger.
        if (!LoggerFactory.loggers.has(LoggerFactory.ROOT_LOGGER_NAME)) {
            LoggerFactory.loggers.set(
                LoggerFactory.ROOT_LOGGER_NAME,
                new Logger(
                    LoggerFactory.ROOT_LOGGER_NAME,
                    rootLoglevel,
                    [new ConsoleAppender()]
                ));
        }
    }

    /**
     * Add Logger. When Logger service has the provided name, do nothing.
     * @param {ILogger}  logger Logger info
     */
    public addLogger(logger: ILogger): void {
        if (!this.has(logger.name)) {
            LoggerFactory.loggers.set(logger.name, new Logger(
                logger.name,
                logger.level,
                logger.appenders
            ));
        }
    }

    /**
     * Remove Logger. Root Logger is unremovable.
     * @param {string}  name Logger name.
     */
    public removeLogger(name: string): void {
        if (LoggerFactory.ROOT_LOGGER_NAME !== name) {
            LoggerFactory.loggers.delete(name);
        }
    }

    /**
     * Get Logger.
     * @param {string}  name Logger name.
     * @return {Logger} When Logger service doesn't have the provided Logger name, return Root Logger.
     */
    public getLogger(name?: string): Logger {
        if (!name) {
            return LoggerFactory.loggers.get(LoggerFactory.ROOT_LOGGER_NAME) as Logger;
        } else if (LoggerFactory.loggers.has(name)) {
            return LoggerFactory.loggers.get(name) as Logger;
        } else {
            return LoggerFactory.loggers.get(LoggerFactory.ROOT_LOGGER_NAME) as Logger;
        }
    }

    /**
     * Logger names.
     * @returns {string[]} Logger names.
     */
    public get loggers(): string[] {
        return Array.from(LoggerFactory.loggers.keys());
    }

    /**
     * Logger service has the Logger or not.
     * @param {string} name Logger name.
     * @return {boolean} When true, Logger service has the Logger.
     */
    public has(name: string): boolean {
        return LoggerFactory.loggers.has(name);
    }
}
