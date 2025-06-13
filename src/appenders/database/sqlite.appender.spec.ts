import { LogLevel } from "@logback4js/core";
import { SqliteAppender } from "./sqlite.appender";
import { Database } from "sqlite3";


describe('SqliteAppender', () => {
  const filepath = './mock/logback4js.sqlite';
  const appender: SqliteAppender = new SqliteAppender(filepath);
  const database: Database = new Database(filepath);

  beforeAll((done) => {
    database.run(
      'CREATE TABLE IF NOT EXISTS log (logger, timestamp, level, message);',
      done
    );
  });

  it('should be created', () => {
    expect(appender).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(SqliteAppender.name);
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.None,
        message: `${LogLevel.None.label} message`,
        logger: "SqliteAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Trace,
        message: `${LogLevel.Trace.label} message`,
        logger: "SqliteAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Debug,
        message: `${LogLevel.Debug.label} message`,
        logger: "SqliteAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Info,
        message: `${LogLevel.Info.label} message`,
        logger: "SqliteAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Warn,
        message: `${LogLevel.Warn.label} message`,
        logger: "SqliteAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    expect(() => {
      appender.doAppend({
        level: LogLevel.Error,
        message: `${LogLevel.Error.label} message`,
        logger: "SqliteAppender",
        timestamp: new Date()
      });
    }).not.toThrow();
  });
});
