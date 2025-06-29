import { LogLevel } from "@logback4js/core";
import { MongoAppender } from "./mongo.appender";
import { MongoClient } from "mongodb";

describe("MongoAppender", () => {
  const name: string = "spec";
  const url =
    "mongodb://mongoadmin:secret@localhost:27017/logback4js?authSource=admin";
  const appender: MongoAppender = new MongoAppender(url, name);

  beforeAll((done) => {
    const client = new MongoClient(url);
    client
      .db()
      .createCollection(name)
      .finally(() => {
        client.close();
        done();
      });
  });

  it("should be created", () => {
    expect(appender).toBeTruthy();
  });

  it("has name", () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(name);
  });

  it("has doAppend method", () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.None,
        message: `${LogLevel.None.label} message`,
        logger: "MongoAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Trace,
        message: `${LogLevel.Trace.label} message`,
        logger: "MongoAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Debug,
        message: `${LogLevel.Debug.label} message`,
        logger: "MongoAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Info,
        message: `${LogLevel.Info.label} message`,
        logger: "MongoAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Warn,
        message: `${LogLevel.Warn.label} message`,
        logger: "MongoAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Error,
        message: `${LogLevel.Error.label} message`,
        logger: "MongoAppender",
        timestamp: new Date(),
      });
    }).not.toThrow();
  });
});
