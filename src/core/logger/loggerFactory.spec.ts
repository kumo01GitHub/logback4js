import { ConsoleAppender } from "../appender/console.appender";
import { HttpPostAppender } from "../appender/httpPost.appender";
import { LogLevel } from "../types/loglevel";
import { LoggerFactory } from "./loggerFactory";

jest.mock('../appender/httpPost.appender');

describe('LoggerFactory', () => {
  beforeEach(() => {
    // TODO: initialize test
    LoggerFactory.initialize();
  });

  it('has Root Logger', () => {
    expect(LoggerFactory.getLogger()).toBeTruthy();
    expect(LoggerFactory.has(LoggerFactory.ROOT_LOGGER_NAME)).toEqual(true);
  });

  it('can add Logger', () => {
    const loggerName = "canAddLogger";
    const beforeLength = LoggerFactory.loggers.length;
    LoggerFactory.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: []
    });

    expect(LoggerFactory.has(loggerName)).toEqual(true);
    expect(LoggerFactory.getLogger(loggerName)).toBeTruthy();
    expect(LoggerFactory.getLogger(loggerName).name).toEqual(loggerName);
    expect(LoggerFactory.loggers).toHaveLength(beforeLength + 1);
  });

  it('can\'t add Logger twice', () => {
    const loggerName = "cantAddLoggerTwice";
    const appenders1 = [new ConsoleAppender()];
    const appenders2 = [new ConsoleAppender(), new HttpPostAppender('http://localhost/mock/log')];

    const beforeLength = LoggerFactory.loggers.length;

    LoggerFactory.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: appenders1
    });
    LoggerFactory.addLogger({
      name: loggerName,
      level: LogLevel.Error,
      appenders: appenders2
    });

    expect(LoggerFactory.has(loggerName)).toEqual(true);
    expect(LoggerFactory.getLogger(loggerName)).toBeTruthy();
    expect(LoggerFactory.loggers).toHaveLength(beforeLength + 1);
    expect(LoggerFactory.getLogger(loggerName).appenders).toHaveLength(appenders1.length);
  });

  it('can remove Logger', () => {
    const loggerName = "canRemoveLogger";
    const beforeLength = LoggerFactory.loggers.length;

    LoggerFactory.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: [new ConsoleAppender()]
    });

    expect(LoggerFactory.has(loggerName)).toEqual(true);
    expect(LoggerFactory.getLogger(loggerName)).toBeTruthy();
    expect(LoggerFactory.loggers).toHaveLength(beforeLength + 1);

    LoggerFactory.removeLogger(loggerName);

    expect(LoggerFactory.has(loggerName)).toEqual(false);
    expect(LoggerFactory.getLogger(loggerName).name).toEqual(LoggerFactory.ROOT_LOGGER_NAME);
    expect(LoggerFactory.loggers).toHaveLength(beforeLength);
  });

  it('can\'t remove Root Logger', () => {
    LoggerFactory.removeLogger(LoggerFactory.ROOT_LOGGER_NAME);

    expect(LoggerFactory.getLogger()).toBeTruthy();
    expect(LoggerFactory.has(LoggerFactory.ROOT_LOGGER_NAME)).toEqual(true);
  });

  it('returns Root Logger without name', () => {
    expect(LoggerFactory.getLogger().name).toEqual(LoggerFactory.ROOT_LOGGER_NAME);
  });

  it('returns Root Logger when not added name', () => {
    expect(LoggerFactory.getLogger("notAddedName").name).toEqual(LoggerFactory.ROOT_LOGGER_NAME);
  });

  it('returns Logger names', () => {
    const loggerName = "addedLogger";
    const before = LoggerFactory.loggers;

    LoggerFactory.addLogger({
      name: loggerName,
      level: LogLevel.Info,
      appenders: [new ConsoleAppender()]
    });

    expect(LoggerFactory.loggers).toEqual(before.concat([loggerName]));
  });
});
