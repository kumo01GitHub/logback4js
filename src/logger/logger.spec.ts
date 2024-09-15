import { LogLevel } from "../types/loglevel";
import { Logger } from "./logger";
import { LoggerFactory } from "./loggerFactory";
import { ConsoleAppender } from "../appender/console.appender";
import { HttpPostAppender } from "../appender/httpPost.appender";

jest.mock('../appender/httpPost.appender');

describe('Logger', () => {
  let rootLogger: Logger;

  let noneLogger: Logger;
  let traceLogger: Logger;
  let debugLogger: Logger;
  let infoLogger: Logger;
  let warnLogger: Logger;
  let errorLogger: Logger;

  beforeEach(() => {
    LoggerFactory.initialize();
    rootLogger = LoggerFactory.getLogger();

    LoggerFactory.addLogger({ name: 'NoneLogger', level: LogLevel.None });
    LoggerFactory.addLogger({ name: 'TraceLogger', level: LogLevel.Trace });
    LoggerFactory.addLogger({ name: 'DebugLogger', level: LogLevel.Debug });
    LoggerFactory.addLogger({ name: 'InfoLogger', level: LogLevel.Info });
    LoggerFactory.addLogger({ name: 'WarnLogger', level: LogLevel.Warn });
    LoggerFactory.addLogger({ name: 'ErrorLogger', level: LogLevel.Error });

    noneLogger = LoggerFactory.getLogger('NoneLogger');
    traceLogger = LoggerFactory.getLogger('TraceLogger');
    debugLogger = LoggerFactory.getLogger('DebugLogger');
    infoLogger = LoggerFactory.getLogger('InfoLogger');
    warnLogger = LoggerFactory.getLogger('WarnLogger');
    errorLogger = LoggerFactory.getLogger('ErrorLogger');
  });

  it('should be created', () => {
    expect(rootLogger).toBeTruthy();
  });

  it('has name', () => {
    expect(rootLogger.name).toBeTruthy();
    expect(rootLogger.name).toEqual(LoggerFactory.ROOT_LOGGER_NAME);
  });

  it('can add appender', () => {
    const addedAppender = new HttpPostAppender('http://localhost/mock/log');
    jest.spyOn(addedAppender, 'doAppend');
    const beforeAppenders = rootLogger.appenders;

    rootLogger.addAppender(addedAppender);
    rootLogger.error('Logger Specific Test');

    expect(addedAppender.doAppend).toHaveBeenCalledTimes(1);
    expect(rootLogger.appenders).toEqual(beforeAppenders.concat(addedAppender.name));
  });

  it('can remove appender', () => {
    const removedAppender = new HttpPostAppender('http://localhost/mock/log');
    jest.spyOn(removedAppender, 'doAppend');

    rootLogger.addAppender(removedAppender);
    rootLogger.error('Logger Specific Test before remove');
    const beforeAppenders = rootLogger.appenders;

    rootLogger.removeAppender(removedAppender.name);
    rootLogger.error('Logger Specific Test after remove');

    expect(removedAppender.doAppend).toHaveBeenCalledTimes(1);
    expect(rootLogger.appenders).toEqual(beforeAppenders.filter(
      (item: string) => item !== removedAppender.name));
  });

  it('which Log Level is None', () => {
    const spyAppender = new ConsoleAppender();
    jest.spyOn(spyAppender, 'doAppend');

    noneLogger.addAppender(spyAppender);
    let calledTimes = 0;

    noneLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    noneLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);
  });

  it('which Log Level is Trace', () => {
    const spyAppender = new ConsoleAppender();
    jest.spyOn(spyAppender, 'doAppend');

    traceLogger.addAppender(spyAppender);
    let calledTimes = 0;

    traceLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    traceLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Debug', () => {
    const spyAppender = new ConsoleAppender();
    jest.spyOn(spyAppender, 'doAppend');

    debugLogger.addAppender(spyAppender);
    let calledTimes = 0;

    debugLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    debugLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    debugLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    debugLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    debugLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Info', () => {
    const spyAppender = new ConsoleAppender();
    jest.spyOn(spyAppender, 'doAppend');

    infoLogger.addAppender(spyAppender);
    let calledTimes = 0;

    infoLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    infoLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    infoLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    infoLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    infoLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Warn', () => {
    const spyAppender = new ConsoleAppender();
    jest.spyOn(spyAppender, 'doAppend');

    warnLogger.addAppender(spyAppender);
    let calledTimes = 0;

    warnLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    warnLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    warnLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    warnLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);

    warnLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });

  it('which Log Level is Error', () => {
    const spyAppender = new ConsoleAppender();
    jest.spyOn(spyAppender, 'doAppend');

    errorLogger.addAppender(spyAppender);
    let calledTimes = 0;

    errorLogger.trace("trace log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.debug("debug log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.info("info log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.warn("warn log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(calledTimes);

    errorLogger.error("error log");
    expect(spyAppender.doAppend).toHaveBeenCalledTimes(++calledTimes);
  });
});
