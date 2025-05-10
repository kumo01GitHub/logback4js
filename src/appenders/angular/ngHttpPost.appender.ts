import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { type ILoggingEvent, JsonAppender } from "@logback4js/core";

/**
 * HTTP POST Appender for Angular.
 */
export class NgHttpPostAppender extends JsonAppender {

    constructor(
        private httpClient: HttpClient,
        private url: string,
        private options?: {
            headers?: HttpHeaders | Record<string, string | string[]>;
            context?: HttpContext;
            observe?: 'body';
            params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
            reportProgress?: boolean;
            responseType: 'arraybuffer';
            withCredentials?: boolean;
            transferCache?: {
                includeHeaders?: string[];
            } | boolean;
        }
    ) {
        super();
    }

    public get name(): string {
        return this.constructor.name;
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