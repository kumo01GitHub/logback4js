import { type ILoggingEvent, JsonAppender } from "@logback4js/core";

/**
 * Google Analytics Appender.
 * @extends JsonAppender
 */
export class GoogleAnalyticsAppender extends JsonAppender {
  constructor(private eventName: string) {
    super();
  }

  public get name(): string {
    return `ga@${this.eventName}`;
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      gtag("event", this.eventName, this.getMessage(event));
    }
  }
}
