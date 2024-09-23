import * as line from "@line/bot-sdk";
import { ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * LINE Messaging API Appender.
 */
export class LineMessagingApiAppender extends TextAppender {
    private client: line.messagingApi.MessagingApiClient;

    constructor(
        channelAccessToken: string,
        private to:  string | string[],
        template?: string
    ) {
        super(template);
        this.client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: channelAccessToken
          });
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            if (typeof this.to === "string") {
                this.client.pushMessage({
                    messages: [
                        {
                            type: "text",
                            text: this.getMessage(event)
                        }
                    ],
                    to: this.to as string
                });

            } else {
                this.client.multicast({
                    messages: [
                        {
                            type: "text",
                            text: this.getMessage(event)
                        }
                    ],
                    to: this.to as string[]
                });
            }
        }
    }
}
