import { LogLevel } from "@logback4js/core";
import { PostgresAppender } from "./postgres.appender";


describe('PostgresAppender', () => {
  const appender: PostgresAppender = new PostgresAppender("postgresql://postgres:postgres@localhost:5432/logback4js");

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(PostgresAppender.name);
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.None,
        message: `${LogLevel.None.label} message`,
        logger: "PostgresAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Trace,
        message: `${LogLevel.Trace.label} message`,
        logger: "PostgresAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Debug,
        message: `${LogLevel.Debug.label} message`,
        logger: "PostgresAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Info,
        message: `${LogLevel.Info.label} message`,
        logger: "PostgresAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Warn,
        message: `${LogLevel.Warn.label} message`,
        logger: "PostgresAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Error,
        message: `${LogLevel.Error.label} message`,
        logger: "PostgresAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });
});
