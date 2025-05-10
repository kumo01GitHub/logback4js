import axios, { type AxiosRequestConfig } from "axios";
import { type ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * Discord Webhook Appender.
 */
export class DiscordWebhookAppender extends TextAppender {

    constructor(
        private url: string,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        private config?: AxiosRequestConfig<any>,
        template?: string
    ) {
        super(template);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            axios.post(
                this.url,
                {
                    content: this.getMessage(event)
                },
                this.config
            );
        }
    }
}
