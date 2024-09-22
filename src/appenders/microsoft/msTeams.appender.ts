import { Client, Options } from "@microsoft/microsoft-graph-client";
import { ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * Microsoft Teams Appender.
 */
export class MSTeamsAppender extends TextAppender {
    private client: Client;

    constructor(
        private teamId: string,
        private channelId: string,
        options: Options,
        template?: string
    ) {
        super(template);
        this.client = Client.init(options);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            this.client.api(`/teams/${this.teamId}/channels/${this.channelId}/messages`)
                .post({
                    body: {
                        contentType: "html",
                        content: this.getMessage(event)
                      }
                });
        }
    }
}
