import axios, { AxiosRequestConfig } from "axios";
import { LogLevel } from "../types/loglevel";
import { HttpPostAppender } from "./httpPost.appender";

describe('HttpPostAppender', () => {
  let appender: HttpPostAppender;
  let appenderNoConfig: HttpPostAppender;
  const url: string = "http://localhost:3000/log";
  const config: AxiosRequestConfig<any> = {
    headers: {
      'X-Forwarded-For': '127.0.0.1'
    }
  };

  const spy = jest.spyOn(axios, 'post');
  
  beforeEach(() => {
    appender = new HttpPostAppender(url, config);
    appenderNoConfig = new HttpPostAppender(url);
  });

  afterEach(() => {
    spy.mockClear();
  });

  it('should be created', () => {
    expect(appender).toBeTruthy();
    expect(appenderNoConfig).toBeTruthy();
  });

  it('has name', () => {
    expect(appender.name).toBeTruthy();
    expect(appender.name).toEqual(HttpPostAppender.name);
  });

  it('has doAppend method', () => {
    expect(appender.doAppend).toBeTruthy();
  });

  it(`append ${LogLevel.None.label} log`, () => {
    const spyGetMessage = jest.spyOn(appender, 'getMessage');

    appender.doAppend({
      level: LogLevel.None,
      message: `${LogLevel.None.label} message`,
      logger: "HttpPostAppender",
      timestamp: new Date()
    });

    expect(spy).toHaveBeenCalledTimes(0);
    expect(spyGetMessage).toHaveBeenCalledTimes(0);
  });

  it(`append ${LogLevel.Trace.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Trace,
      message: `${LogLevel.Trace.label} message`,
      logger: "HttpPostAppender",
      timestamp: new Date()
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Debug.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Debug,
      message: `${LogLevel.Debug.label} message`,
      logger: "HttpPostAppender",
      timestamp: new Date()
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Info.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Info,
      message: `${LogLevel.Info.label} message`,
      logger: "HttpPostAppender",
      timestamp: new Date()
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Warn.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Warn,
      message: `${LogLevel.Warn.label} message`,
      logger: "HttpPostAppender",
      timestamp: new Date()
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`append ${LogLevel.Error.label} log`, () => {
    appender.doAppend({
      level: LogLevel.Error,
      message: `${LogLevel.Error.label} message`,
      logger: "HttpPostAppender",
      timestamp: new Date()
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
