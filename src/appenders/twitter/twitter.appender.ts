import { Client } from "twitter-api-sdk";
import { AuthClient } from "twitter-api-sdk/dist/types";
import { type RequestOptions } from "twitter-api-sdk/dist/request";
import { type ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * Twitter Appender.
 * Using this Appender in browser, proxy setting is required to bypass CORS.
 * @extends TextAppender
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

  /**
   * String `"Twitter"`
   */
  public get name(): string {
    return "Twitter";
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      this.client.tweets.createTweet({
        text: this.getMessage(event),
      });
    }
  }
}
