import { LogLevel } from "./loglevel";

describe('LogLevel', () => {

  it('has NONE', () => {
    expect(LogLevel.None).toBeTruthy();
    expect(LogLevel.None.priority).toBeFalsy();
    expect(LogLevel.None.label).toEqual("NONE");
  });

  it('has TRACE', () => {
    expect(LogLevel.Trace).toBeTruthy();
    expect(LogLevel.Trace.priority).toBeTruthy();
    expect(LogLevel.Trace.label).toEqual("TRACE");
  });

  it('has DEBUG', () => {
    expect(LogLevel.Debug).toBeTruthy();
    expect(LogLevel.Debug.priority).toBeTruthy();
    expect(LogLevel.Debug.label).toEqual("DEBUG");
  });

  it('has INFO', () => {
    expect(LogLevel.Info).toBeTruthy();
    expect(LogLevel.Info.priority).toBeTruthy();
    expect(LogLevel.Info.label).toEqual("INFO");
  });

  it('has WARN', () => {
    expect(LogLevel.Warn).toBeTruthy();
    expect(LogLevel.Warn.priority).toBeTruthy();
    expect(LogLevel.Warn.label).toEqual("WARN");
  });

  it('has ERROR', () => {
    expect(LogLevel.Error).toBeTruthy();
    expect(LogLevel.Error.priority).toBeTruthy();
    expect(LogLevel.Error.label).toEqual("ERROR");
  });

  it('NONE < TRACE < DEBUG < INFO < WARN < ERROR', () => {
    expect(LogLevel.None.priority).toBeLessThan(LogLevel.Trace.priority);
    expect(LogLevel.Trace.priority).toBeLessThan(LogLevel.Debug.priority);
    expect(LogLevel.Debug.priority).toBeLessThan(LogLevel.Info.priority);
    expect(LogLevel.Info.priority).toBeLessThan(LogLevel.Warn.priority);
    expect(LogLevel.Warn.priority).toBeLessThan(LogLevel.Error.priority);
  });

});
