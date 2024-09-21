import axios, { AxiosRequestConfig } from "axios";
import { ILoggingEvent } from "./appender";
import { TextAppender } from "./textAppender";

/**
 * Discord Webhook Appender.
 */
export class DiscordWebhookAppender extends TextAppender {

    constructor(
        private url: string,
        private config?: AxiosRequestConfig<any>,
        template?: string
    ) {
        super(template);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
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
