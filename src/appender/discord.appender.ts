import { Client, ClientOptions, TextChannel } from "discord.js";
import { TextAppender } from "./textAppender";
import { ILoggingEvent } from "./appender";

/**
 * Discord Appender.
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
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!this.client) {
            console.warn("Client is not ready");
        } else if (!!event.level.priority) {
            (this.client.channels.cache.get(this.channelId) as TextChannel).send(
                this.getMessage(event)
            );
        }
    }
}
