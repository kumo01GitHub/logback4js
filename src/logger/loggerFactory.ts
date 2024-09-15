import { Logger } from "./logger";
import { Appender } from "../appender/appender";
import { ConsoleAppender } from "../appender/console.appender";
import { LogLevel } from "../types/loglevel";
import { BaseLogger } from "./baseLogger";

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
 * Factory class of Loggers.
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
    private static _loggers: Map<string, Logger> = new Map<string, Logger>();

    /**
     * Initialize Logger Factory. When already initialized, do nothing.
     * @param {LogLevel} rootLoglevel Root Logger's log level. Default value is Trace.
     */
    public static initialize(
        rootLoglevel: LogLevel = LogLevel.Trace
    ): void {
        // Add Root Logger
        LoggerFactory.addLogger({
            name: LoggerFactory.ROOT_LOGGER_NAME,
            level: rootLoglevel,
            appenders: [new ConsoleAppender()]
        });
    }

    /**
     * Logger Factory is initialized.
     */
    public static get isInitialized(): boolean {
        return LoggerFactory._loggers.has(LoggerFactory.ROOT_LOGGER_NAME);
    }

    /**
     * Add Logger. When Logger Factory has the provided name, do nothing.
     * If Logger Factory is not initialized, added as Root Logger.
     * @param {ILogger}  logger Logger info
     */
    public static addLogger(logger: ILogger): void {
        const name: string = LoggerFactory.isInitialized? logger.name : LoggerFactory.ROOT_LOGGER_NAME;
        if (!LoggerFactory.has(name)) {
            LoggerFactory._loggers.set(name, new BaseLogger(
                name,
                logger.level,
                logger.appenders
            ));
        }
    }

    /**
     * Remove Logger. Root Logger is unremovable.
     * @param {string}  name Logger name.
     */
    public static removeLogger(name: string): void {
        if (LoggerFactory.ROOT_LOGGER_NAME !== name) {
            LoggerFactory._loggers.delete(name);
        }
    }

    /**
     * Get Logger.
     * @param {string}  name Logger name.
     * @return {Logger} When Logger service doesn't have the provided Logger name, return Root Logger.
     */
    public static getLogger(name?: string): Logger {
        if (!name) {
            return LoggerFactory._loggers.get(LoggerFactory.ROOT_LOGGER_NAME) as Logger;
        } else if (LoggerFactory._loggers.has(name)) {
            return LoggerFactory._loggers.get(name) as Logger;
        } else {
            return LoggerFactory._loggers.get(LoggerFactory.ROOT_LOGGER_NAME) as Logger;
        }
    }

    /**
     * Logger names.
     * @returns {string[]} Logger names.
     */
    public static get loggers(): string[] {
        return Array.from(LoggerFactory._loggers.keys());
    }

    /**
     * Logger Factory has the Logger or not.
     * @param {string} name Logger name.
     * @return {boolean} When true, Logger service has the Logger.
     */
    public static has(name: string): boolean {
        return LoggerFactory._loggers.has(name);
    }
}
