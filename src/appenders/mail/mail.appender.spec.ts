import { LogLevel, type ILoggingEvent } from "@logback4js/core";
import { MailAppender } from "./mail.appender";

describe("MailAppender", () => {
  class SpecAppender extends MailAppender {
    doAppend(event: ILoggingEvent): void {
      console.log(this.getMessage(event));
    }
  }
  let appender: MailAppender;

  beforeEach(() => {
    appender = new SpecAppender({});
  });

  it("should be created", () => {
    expect(appender).toBeTruthy();
  });

  it("has name", () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual("Mail");
  });
});
