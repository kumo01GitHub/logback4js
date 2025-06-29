import { type Analytics, logEvent } from "firebase/analytics";
import { type ILoggingEvent, JsonAppender } from "@logback4js/core";

/**
 * Google Analytics for Firebase Appender.
 * @extends JsonAppender
 */
export class FirebaseAnalyticsAppender extends JsonAppender {
  /**
   * Google Analytics for Firebase Appender.
   * @param {Analytics} analytics An instance of Firebase Analytics.
   * @param {string} eventName Event name.
   */
  constructor(private analytics: Analytics, private eventName: string) {
    super();
  }

  public get name(): string {
    return `firebase@${this.eventName}`;
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      logEvent(this.analytics, this.eventName, this.getMessage(event));
    }
  }
}
