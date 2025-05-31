import { LogLevel } from "@logback4js/core";
import { RichMailAppender } from "./rich-mail.appender";

describe('MailAppender', () => {
  let appender: RichMailAppender;

  beforeEach(() => {
    appender = new RichMailAppender(
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
    expect(appender.name).toEqual(RichMailAppender.name);
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Debug,
      message: `${LogLevel.Debug.label} message`,
      logger: "RichMailAppender",
      timestamp: new Date()
    });
    expect(true).toBeTruthy();
  })
});
