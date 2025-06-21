import { type ILoggingEvent } from "@logback4js/core";
import { Address, MailAppender } from "./mail.appender";


/**
 * Rich Mail Appender.
 */
export class RichMailAppender extends MailAppender {
    constructor(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options: any,
        protected from?: string | Address | undefined,
        protected sender?: string | Address | undefined,
        protected to?: string | Address | Array<string | Address> | undefined,
        protected cc?: string | Address | Array<string | Address> | undefined,
        protected bcc?: string | Address | Array<string | Address> | undefined,
        subjTemplate?: string,
        msgTemplate?: string,
    ) {
        super(options, from, sender, to, cc, bcc, subjTemplate, msgTemplate);
    }

    public doAppend(event: ILoggingEvent): void {
        const message = this.getMessage(event);
        if (event.level.priority) {
            this.transporter.sendMail({
                from: this.from,
                sender: this.sender,
                to: this.to,
                cc: this.cc,
                bcc: this.bcc,
                subject: message.subj,
                html: message.msg,
                priority: this.getPriority(event),
            });
        }
    }
}
