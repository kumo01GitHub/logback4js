import { createTransport, Transporter } from "nodemailer";
import { type ILoggingEvent, TextAppender } from "@logback4js/core";

/**
 * Simple Mail Appender.\
 * @see {@link https://nodemailer.com|Nodemailer}
 */
export class SimpleMailAppender extends TextAppender {
    private transporter: Transporter;

    constructor(
        private from: string,
        private to: string,
        options: any,
        template?: string
    ) {
        super(template);
        this.transporter = createTransport(options);
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            this.transporter.sendMail({
                from: this.from,
                to: this.to,
                text: event.message
            });
        }
    }
}
