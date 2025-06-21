import { Client, type ClientOptions, TextChannel } from "discord.js";
import { type ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * Discord Appender.
 * @extends TextAppender
 */
export class DiscordAppender extends TextAppender {
    private client: Client | undefined;

    constructor(
        private channelId: string,
        options: ClientOptions,
        template?: string
    ) {
        super(template);
        const client = new Client(options);
        client.on('ready', (client: Client) => {
            this.client = client;
        })
    }

    public get name(): string {
        return `discord@${this.channelId}`;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!this.client) {
            console.warn("Client is not ready");
        } else if (event.level.priority) {
            (this.client.channels.cache.get(this.channelId) as TextChannel).send(
                this.getMessage(event)
            );
        }
    }
}
