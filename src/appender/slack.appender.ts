import { WebClient, WebClientOptions } from "@slack/web-api";
import { Appender, ILoggingEvent } from "./appender";

/**
 * Slack Appender.
 */
export class SlackAppender implements Appender {
    private client: WebClient;

    constructor(
        private channel: string,
        token: string,
        options?: WebClientOptions
    ) {
        this.client = new WebClient(token, options);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.client.chat.postMessage({
                channel: this.channel,
                text: `[${event.logger}:${event.level.label}] ${event.timestamp} - ${event.message}`
            });
        }
    }
}
