import { Client } from "twitter-api-sdk";
import { AuthClient } from "twitter-api-sdk/dist/types";
import { RequestOptions } from "twitter-api-sdk/dist/request";
import { ILoggingEvent } from "./appender";
import { TextAppender } from "./textAppender";

/**
 * Twitter Appender.
 * Using this Appender in browser, proxy setting is required to bypass CORS.
 */
export class TwitterAppender extends TextAppender {
    private client: Client;

    constructor(
        auth: string | AuthClient,
        requestOptions?: Partial<RequestOptions>,
        template?: string
    ) {
        super(template);
        this.client = new Client(auth, requestOptions);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.client.tweets.createTweet({
                text: this.getMessage(event)
            });
        }
    }
}
