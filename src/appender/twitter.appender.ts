import { Client } from "twitter-api-sdk";
import { AuthClient } from "twitter-api-sdk/dist/types";
import { RequestOptions } from "twitter-api-sdk/dist/request";
import { Appender, ILoggingEvent } from "./appender";

/**
 * Twitter Appender.
 * Using this Appender in browser, proxy setting is required to bypass CORS.
 */
export class TwitterAppender implements Appender {
    private client: Client;

    constructor(
        auth: string | AuthClient,
        requestOptions?: Partial<RequestOptions>
    ) {
        this.client = new Client(auth, requestOptions);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.client.tweets.createTweet({
                text: `[${event.logger}:${event.level.label}] ${event.timestamp} - ${event.message}`
            });
        }
    }
}
