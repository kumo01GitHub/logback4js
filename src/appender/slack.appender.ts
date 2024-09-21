import { WebClient, WebClientOptions } from "@slack/web-api";
import { ILoggingEvent } from "./appender";
import { TextAppender } from "./textAppender";

/**
 * Slack Appender.
 */
export class SlackAppender extends TextAppender {
    private client: WebClient;

    constructor(
        private channel: string,
        token: string,
        options?: WebClientOptions,
        template?: string
    ) {
        super(template);
        this.client = new WebClient(token, options);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.client.chat.postMessage({
                channel: this.channel,
                text: this.getMessage(event)
            });
        }
    }
}
