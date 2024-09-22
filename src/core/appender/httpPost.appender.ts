import axios, { AxiosRequestConfig } from "axios";
import { ILoggingEvent } from "./appender";
import { JsonAppender } from "./jsonAppender";

/**
 * HTTP POST Appender.
 */
export class HttpPostAppender extends JsonAppender {

    constructor(
        private url: string,
        private config?: AxiosRequestConfig<any>
    ) {
        super();
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            axios.post(
                this.url,
                this.getMessage(event),
                this.config
            );
        }
    }
}
