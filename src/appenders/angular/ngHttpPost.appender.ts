import { HttpClient } from "@angular/common/http";
import { type ILoggingEvent, JsonAppender } from "@logback4js/core";

/**
 * HTTP POST Appender for Angular.
 * @extends JsonAppender
 */
export class NgHttpPostAppender extends JsonAppender {

    /**
     * HTTP POST Appender for Angular.
     * @param {HttpClient} httpClient HTTP Client.
     * @param {string} url API URL.
     * @param {any} options Post request options.
     */
    constructor(
        private httpClient: HttpClient,
        private url: string,
        private options?: any // eslint-disable-line
    ) {
        super();
    }

    public get name(): string {
        return `ng@${new URL(this.url).hostname}`;
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            this.httpClient.post(
                this.url,
                this.getMessage(event),
                this.options
            ).subscribe();
        }
    }
}