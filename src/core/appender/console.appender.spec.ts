import { LogLevel } from "../consts/loglevel";
import { ConsoleAppender } from "./console.appender";

describe("ConsoleAppender", () => {
  const appender: ConsoleAppender = new ConsoleAppender();
  let spys: { [key: string]: any };

  beforeEach(() => {
    spys = {
      log: jest.spyOn(console, "log"),
      trace: jest.spyOn(console, "trace"),
      debug: jest.spyOn(console, "debug"),
      info: jest.spyOn(console, "info"),
      warn: jest.spyOn(console, "warn"),
      error: jest.spyOn(console, "error"),
      getMessage: jest.spyOn(appender, "getMessage"),
    };
  });

  afterEach(() => {
    for (let key in spys) {
      spys[key].mockClear();
    }
  });

  it("should be created", () => {
    expect(appender).toBeTruthy();
  });

  it("has name", () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual("console");
  });

  it("has doAppend method", () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    appender.doAppend({
      level: LogLevel.None,
      message: `${LogLevel.None.label} message`,
      logger: "ConsoleSpecLogger",
      timestamp: new Date(),
    });

    expect(spys["log"]).toHaveBeenCalledTimes(0);
    expect(spys["trace"]).toHaveBeenCalledTimes(0);
    expect(spys["debug"]).toHaveBeenCalledTimes(0);
    expect(spys["info"]).toHaveBeenCalledTimes(0);
    expect(spys["warn"]).toHaveBeenCalledTimes(0);
    expect(spys["error"]).toHaveBeenCalledTimes(0);
    expect(spys["getMessage"]).toHaveBeenCalledTimes(0);
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Trace,
      message: `${LogLevel.Trace.label} message`,
      logger: "ConsoleSpecLogger",
      timestamp: new Date(),
    });

    expect(spys["log"]).toHaveBeenCalledTimes(0);
    expect(spys["trace"]).toHaveBeenCalledTimes(1);
    expect(spys["debug"]).toHaveBeenCalledTimes(0);
    expect(spys["info"]).toHaveBeenCalledTimes(0);
    expect(spys["warn"]).toHaveBeenCalledTimes(0);
    expect(spys["error"]).toHaveBeenCalledTimes(1);
    expect(spys["getMessage"]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Debug,
      message: `${LogLevel.Debug.label} message`,
      logger: "ConsoleSpecLogger",
      timestamp: new Date(),
    });

    expect(spys["log"]).toHaveBeenCalledTimes(0);
    expect(spys["trace"]).toHaveBeenCalledTimes(0);
    expect(spys["debug"]).toHaveBeenCalledTimes(1);
    expect(spys["info"]).toHaveBeenCalledTimes(0);
    expect(spys["warn"]).toHaveBeenCalledTimes(0);
    expect(spys["error"]).toHaveBeenCalledTimes(0);
    expect(spys["getMessage"]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Info,
      message: `${LogLevel.Info.label} message`,
      logger: "ConsoleSpecLogger",
      timestamp: new Date(),
    });

    expect(spys["log"]).toHaveBeenCalledTimes(0);
    expect(spys["trace"]).toHaveBeenCalledTimes(0);
    expect(spys["debug"]).toHaveBeenCalledTimes(0);
    expect(spys["info"]).toHaveBeenCalledTimes(1);
    expect(spys["warn"]).toHaveBeenCalledTimes(0);
    expect(spys["error"]).toHaveBeenCalledTimes(0);
    expect(spys["getMessage"]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Warn,
      message: `${LogLevel.Warn.label} message`,
      logger: "ConsoleSpecLogger",
      timestamp: new Date(),
    });

    expect(spys["log"]).toHaveBeenCalledTimes(0);
    expect(spys["trace"]).toHaveBeenCalledTimes(0);
    expect(spys["debug"]).toHaveBeenCalledTimes(0);
    expect(spys["info"]).toHaveBeenCalledTimes(0);
    expect(spys["warn"]).toHaveBeenCalledTimes(1);
    expect(spys["error"]).toHaveBeenCalledTimes(0);
    expect(spys["getMessage"]).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Error,
      message: `${LogLevel.Error.label} message`,
      logger: "ConsoleSpecLogger",
      timestamp: new Date(),
    });

    expect(spys["log"]).toHaveBeenCalledTimes(0);
    expect(spys["trace"]).toHaveBeenCalledTimes(0);
    expect(spys["debug"]).toHaveBeenCalledTimes(0);
    expect(spys["info"]).toHaveBeenCalledTimes(0);
    expect(spys["warn"]).toHaveBeenCalledTimes(0);
    expect(spys["error"]).toHaveBeenCalledTimes(1);
    expect(spys["getMessage"]).toHaveBeenCalledTimes(1);
  });
});
