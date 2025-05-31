import { LogLevel } from "@logback4js/core";
import { MailAppender } from "./rich-mail.appender";

describe('MailAppender', () => {
  let appender: MailAppender;

  beforeEach(() => {
    appender = new MailAppender(
      "from@example.com",
      "to@example.com",
      {
        host: "localhost",
        port: 1025,
        secure: false,
        requireTLS: false,
        tls: { rejectUnauthorized: false },
      }
    );
  });

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(MailAppender.name);
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Debug,
      message: `${LogLevel.Debug.label} message`,
      logger: "ConsoleAppender",
      timestamp: new Date()
    });
    expect(true).toBeTruthy();
  })
});
