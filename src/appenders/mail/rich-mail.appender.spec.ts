import { LogLevel } from "@logback4js/core";
import { RichMailAppender } from "./rich-mail.appender";


describe('RichMailAppender', () => {
  const appender: RichMailAppender = new RichMailAppender(
    {
      host: "localhost",
      port: 1025,
      secure: false,
      requireTLS: false,
      tls: { rejectUnauthorized: false },
    },
    "from@example.com",
    "jest",
    "to@example.com",
  );

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual("RichMail");
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.None,
        message: `<p><ul><li><b>${LogLevel.None.label}</b></li><li>rich text message</li></ul></p>`,
        logger: "RichMailAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Trace,
        message: `<p><ul><li><b>${LogLevel.Trace.label}</b></li><li>rich text message</li></ul></p>`,
        logger: "RichMailAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Debug,
        message: `<p><ul><li><b>${LogLevel.Debug.label}</b></li><li>rich text message</li></ul></p>`,
        logger: "RichMailAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Info,
        message: `<p><ul><li><b>${LogLevel.Info.label}</b></li><li>rich text message</li></ul></p>`,
        logger: "RichMailAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Warn,
        message: `<p><ul><li><b>${LogLevel.Warn.label}</b></li><li>rich text message</li></ul></p>`,
        logger: "RichMailAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Error,
        message: `<p><ul><li><b>${LogLevel.Error.label}</b></li><li>rich text message</li></ul></p>`,
        logger: "RichMailAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });
});
