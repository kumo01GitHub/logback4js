import { Client, Options } from "@microsoft/microsoft-graph-client";
import { Appender, ILoggingEvent } from "./appender";

/**
 * Microsoft Teams Appender.
 */
export class MSTeamsAppender implements Appender {
    private client: Client;

    constructor(
        private teamId: string,
        private channelId: string,
        options: Options
    ) {
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
                        content: `<h1>${event.logger}: ${event.level.label}</h1><p>${event.timestamp}: ${event.message}</p>`
                      }
                });
        }
    }
}
