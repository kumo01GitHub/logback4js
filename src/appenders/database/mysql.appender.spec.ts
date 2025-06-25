import { LogLevel } from "@logback4js/core";
import { MySQLAppender } from "./mysql.appender";
import { basename } from "node:path";


describe('MySQLAppender', () => {
  const url: string = "mysql://mysql:password@localhost:3306/logback4js";
  const appender: MySQLAppender = new MySQLAppender(url);

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(basename(url));
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.None,
        message: `${LogLevel.None.label} message`,
        logger: "MySQLAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Trace,
        message: `${LogLevel.Trace.label} message`,
        logger: "MySQLAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Debug,
        message: `${LogLevel.Debug.label} message`,
        logger: "MySQLAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Info,
        message: `${LogLevel.Info.label} message`,
        logger: "MySQLAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Warn,
        message: `${LogLevel.Warn.label} message`,
        logger: "MySQLAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Error,
        message: `${LogLevel.Error.label} message`,
        logger: "MySQLAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });
});
