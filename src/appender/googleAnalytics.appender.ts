import { ILoggingEvent } from "./appender";
import { JsonAppender } from "./jsonAppender";

/**
 * Google Analytics Appender.
 */
export class GoogleAnalyticsAppender extends JsonAppender {

    constructor(
        private eventName: string
    ) {
        super();
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            gtag('event', this.eventName, this.getMessage(event));
        }
    }
}
