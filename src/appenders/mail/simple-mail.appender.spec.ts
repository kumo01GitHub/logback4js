import { LogLevel } from "@logback4js/core";
import { SimpleMailAppender } from "./simple-mail.appender";

describe("SimpleMailAppender", () => {
  const appender: SimpleMailAppender = new SimpleMailAppender(
    {
      host: "localhost",
      port: 1025,
      secure: false,
      requireTLS: false,
      tls: { rejectUnauthorized: false },
    },
    "from@example.com",
    "jest",
    "to@example.com"
  );

  it("should be created", () => {
    expect(appender).toBeTruthy();
  });

  it("has name", () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual("SimpleMail");
  });

  it("has doAppend method", () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.None,
        message: `${LogLevel.None.label} - simple text message`,
        logger: "SimpleMailAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Trace,
        message: `${LogLevel.Trace.label} - simple text message`,
        logger: "SimpleMailAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Debug,
        message: `${LogLevel.Debug.label} - simple text message`,
        logger: "SimpleMailAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Info,
        message: `${LogLevel.Info.label} - simple text message`,
        logger: "SimpleMailAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Warn,
        message: `${LogLevel.Warn.label} - simple text message`,
        logger: "SimpleMailAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Error,
        message: `${LogLevel.Error.label} - simple text message`,
        logger: "SimpleMailAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });
});
