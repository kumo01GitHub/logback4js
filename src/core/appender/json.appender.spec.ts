import { LogLevel } from "../consts/loglevel";
import { type ILoggingEvent } from "./appender";
import { JsonAppender } from "./json.appender";

describe("JsonAppender", () => {
  class SpecAppender extends JsonAppender {
    constructor(template?: { [key: string]: any }) {
      super(template);
    }
    get name(): string {
      return "spec";
    }
    doAppend(event: ILoggingEvent): void {
      console.log(this.getMessage(event));
    }
  }
  let appender: JsonAppender;

  beforeEach(() => {
    appender = new SpecAppender();
  });

  it("should be created", () => {
    expect(appender).toBeTruthy();
  });

  it("has name", () => {
    expect(appender.name).toBeTruthy();
  });

  it("has doAppend method", () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it("getMessage returns Object", () => {
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
      message: event.message,
    });
  });

  it("can customize message", () => {
    const timestamp: Date = new Date();
    const id: number = 999;
    const customMsgAppender: JsonAppender = new SpecAppender({
      msg: "${level} : ${message}",
      from: "${ appender } of ${ logger }",
      datetime: "${ timestamp }",
      id: id,
    });
    const event = {
      logger: "SpecLogger",
      timestamp: timestamp,
      level: LogLevel.Info,
      message: "Specification Test",
    };

    expect(customMsgAppender.getMessage(event)).toEqual({
      msg: `${event.level.label} : ${event.message}`,
      from: `${ customMsgAppender.name } of ${ event.logger }`,
      datetime: timestamp.toISOString(),
      id: id,
    });
  });
});
