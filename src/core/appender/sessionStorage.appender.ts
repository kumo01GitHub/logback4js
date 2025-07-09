import { v4 as uuid } from "uuid";
import { type ILoggingEvent } from "./appender";
import { TextAppender } from "./text.appender";

/**
 * SessionStorage Appender. The key is UUID.
 * @extends TextAppender
 */
export class SessionStorageAppender extends TextAppender {
  /**
   * SessionStorage Appender.
   * @param {sting} keyPrefix SessionStorage key prefix.
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
      sessionStorage.setItem(this.generateKey(), this.getMessage(event));
    }
  }

  private generateKey(): string {
    return this.keyPrefix + "@" + uuid();
  }
}
