import { LogLevel } from "../types/loglevel";
import { ILoggingEvent } from "./appender";
import { TextAppender } from "./textAppender";

describe('TextAppender', () => {
  class SpecAppender extends TextAppender {
    get name(): string {
      return this.constructor.name;
    }
    doAppend(event: ILoggingEvent): void {
      console.log(this.getMessage(event));
    }
  }
  let appender: TextAppender;
  let appenderCustomMessage: TextAppender;

  beforeEach(() => {
    appender = new SpecAppender();
    appenderCustomMessage = new SpecAppender("${logger},${level},${timestamp},${message}");
  });

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it('getMessage returns default formatted string', () => {
    const event = {
      logger: "DefaultSpecLogger",
      timestamp: new Date(),
      level: LogLevel.Info,
      message: "Default Format",
    };
    expect(appender.getMessage(event)).toEqual(`[${event.logger}:${event.level.label}] ${event.timestamp} - ${event.message}`);
  });

  it('getMessage returns custom formatted string', () => {
    const event = {
      logger: "CustomSpecLogger",
      timestamp: new Date(),
      level: LogLevel.Info,
      message: "Custom Format",
    };
    expect(appenderCustomMessage.getMessage(event)).toEqual(`${event.logger},${event.level.label},${event.timestamp},${event.message}`);
  });
});
