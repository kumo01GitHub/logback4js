import axios, { type AxiosRequestConfig } from "axios";
import { type ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * Discord Webhook Appender.
 * @extends TextAppender
 */
export class DiscordWebhookAppender extends TextAppender {

    constructor(
        private url: string,
        private config?: AxiosRequestConfig<any>, // eslint-disable-line
        template?: string
    ) {
        super(template);
    }

    /**
     * String `"DiscordWebhook"`
     */
    public get name(): string {
        return "DiscordWebhook";
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
