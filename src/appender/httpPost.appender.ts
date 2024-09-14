import axios, { AxiosRequestConfig } from "axios";

import { Appender, ILoggingEvent } from "./appender";

/**
 * HTTP POST Appender.
 */
export class HttpPostAppender implements Appender {

    constructor(
        private url: string,
        private config?: AxiosRequestConfig<any>
    ) { }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            axios.post(
                this.url,
                {
                    logger: event.logger,
                    level: event.level.label,
                    timestamp: event.timestamp,
                    message: event.message
                },
                this.config
            );
        }
    }
}
