import { Analytics, logEvent } from "firebase/analytics";
import { ILoggingEvent, JsonAppender } from "@logback4js/core";

/**
 * Google Analytics for Firebase Appender.
 */
export class FirebaseAnalyticsAppender extends JsonAppender {

    constructor(
        private analytics: Analytics,
        private eventName: string
    ) {
        super();
    }

    public get name(): string {
        return this.analytics.app.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            logEvent(this.analytics, this.eventName, this.getMessage(event));
        }
    }
}
