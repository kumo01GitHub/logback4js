import axios from "axios";
import { ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * LINE Notify Appender.
 */
export class DiscordWebhookAppender extends TextAppender {
    private readonly LINE_NOTIFY_API_URL = "https://notify-api.line.me/api/notify";

    constructor(
        private accessToken: string,
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
                this.LINE_NOTIFY_API_URL,
                {
                    message: this.getMessage(event)
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        'Content-Type': "application/x-www-form-urlencoded",
                    }
                }
            );
        }
    }
}
