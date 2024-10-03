import { LogLevel } from "../types/loglevel";
import { ConsoleAppender } from "./console.appender";

describe('ConsoleAppender', () => {
  let appender: ConsoleAppender;
  let spys: any[];

  beforeEach(() => {
    appender = new ConsoleAppender();

    spys = [
      jest.spyOn(console, 'log'),
      jest.spyOn(console, 'trace'),
      jest.spyOn(console, 'debug'),
      jest.spyOn(console, 'info'),
      jest.spyOn(console, 'warn'),
      jest.spyOn(console, 'error'),
      jest.spyOn(appender, 'getMessage')
    ]
  });

  afterEach(() => {
    spys.forEach((spy) => {
      spy.mockClear();
    })
  });

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(ConsoleAppender.name);
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    const spyLog = jest.spyOn(console, 'log');
    const spyTrace = jest.spyOn(console, 'trace');
    const spyDebug = jest.spyOn(console, 'debug');
    const spyInfo = jest.spyOn(console, 'info');
    const spyWarn = jest.spyOn(console, 'warn');
    const spyError = jest.spyOn(console, 'error');
    const spyGetMessage = jest.spyOn(appender, 'getMessage');

    appender.doAppend({
      level: LogLevel.None,
      message: `${LogLevel.None.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });

    expect(spyLog).toHaveBeenCalledTimes(0);
    expect(spyTrace).toHaveBeenCalledTimes(0);
    expect(spyDebug).toHaveBeenCalledTimes(0);
    expect(spyInfo).toHaveBeenCalledTimes(0);
    expect(spyWarn).toHaveBeenCalledTimes(0);
    expect(spyError).toHaveBeenCalledTimes(0);
    expect(spyGetMessage).toHaveBeenCalledTimes(0);
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Trace,
      message: `${LogLevel.Trace.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });

    expect(spys[0]).toHaveBeenCalledTimes(0);
    expect(spys[1]).toHaveBeenCalledTimes(1);
    expect(spys[2]).toHaveBeenCalledTimes(0);
    expect(spys[3]).toHaveBeenCalledTimes(0);
    expect(spys[4]).toHaveBeenCalledTimes(0);
    expect(spys[5]).toHaveBeenCalledTimes(1);
    expect(spys[6]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Debug,
      message: `${LogLevel.Debug.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });

    expect(spys[0]).toHaveBeenCalledTimes(0);
    expect(spys[1]).toHaveBeenCalledTimes(0);
    expect(spys[2]).toHaveBeenCalledTimes(1);
    expect(spys[3]).toHaveBeenCalledTimes(0);
    expect(spys[4]).toHaveBeenCalledTimes(0);
    expect(spys[5]).toHaveBeenCalledTimes(0);
    expect(spys[6]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Info,
      message: `${LogLevel.Info.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });

    expect(spys[0]).toHaveBeenCalledTimes(0);
    expect(spys[1]).toHaveBeenCalledTimes(0);
    expect(spys[2]).toHaveBeenCalledTimes(0);
    expect(spys[3]).toHaveBeenCalledTimes(1);
    expect(spys[4]).toHaveBeenCalledTimes(0);
    expect(spys[5]).toHaveBeenCalledTimes(0);
    expect(spys[6]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Warn,
      message: `${LogLevel.Warn.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });

    expect(spys[0]).toHaveBeenCalledTimes(0);
    expect(spys[1]).toHaveBeenCalledTimes(0);
    expect(spys[2]).toHaveBeenCalledTimes(0);
    expect(spys[3]).toHaveBeenCalledTimes(0);
    expect(spys[4]).toHaveBeenCalledTimes(1);
    expect(spys[5]).toHaveBeenCalledTimes(0);
    expect(spys[6]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Error,
      message: `${LogLevel.Error.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });

    expect(spys[0]).toHaveBeenCalledTimes(0);
    expect(spys[1]).toHaveBeenCalledTimes(0);
    expect(spys[2]).toHaveBeenCalledTimes(0);
    expect(spys[3]).toHaveBeenCalledTimes(0);
    expect(spys[4]).toHaveBeenCalledTimes(0);
    expect(spys[5]).toHaveBeenCalledTimes(1);
    expect(spys[6]).toHaveBeenCalledTimes(1);
  });
});
