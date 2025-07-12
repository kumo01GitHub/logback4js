import { v4 as uuid } from "uuid";
import { type ILoggingEvent, TextAppender } from "@logback4js/core";
/**
 * LocalStorage Appender. The key is UUID.
 * @extends TextAppender
 */
export class LocalStorageAppender extends TextAppender {
  /**
   * LocalStorage Appender.
   * @param {sting} keyPrefix LocalStorage key prefix.
   * @param {string} template Log message template.
   */
  constructor(private keyPrefix: string, template?: string) {
    super(template);
  }

  /**
   * Key prefix.
   */
  public get name(): string {
    return this.keyPrefix;
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      localStorage.setItem(this.generateKey(), this.getMessage(event));
    }
  }

  private generateKey(): string {
    return this.keyPrefix + "@" + uuid();
  }
}
