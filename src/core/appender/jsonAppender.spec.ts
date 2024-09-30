import { LogLevel } from "../types/loglevel";
import { ILoggingEvent } from "./appender";
import { JsonAppender } from "./jsonAppender";

describe('JsonAppender', () => {
  class SpecAppender extends JsonAppender {
    get name(): string {
      return this.constructor.name;
    }
    doAppend(event: ILoggingEvent): void {
      console.log(this.getMessage(event));
    }
  }
  let appender: JsonAppender;

  beforeEach(() => {
    appender = new SpecAppender();
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

  it('getMessage returns Object', () => {
    const event = {
      logger: "SpecLogger",
      timestamp: new Date(),
      level: LogLevel.Info,
      message: "Specification Test",
    };
    expect(appender.getMessage(event)).toEqual({
      logger: event.logger,
      timestamp: event.timestamp,
      level: event.level.label,
      message: event.message
    });
  });
});
