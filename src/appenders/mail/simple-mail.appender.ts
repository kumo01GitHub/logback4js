import { type ILoggingEvent } from "@logback4js/core";
import { Address, MailAppender } from "./mail.appender";

/**
 * Simple Mail Appender.
 * @extends MailAppender
 */
export class SimpleMailAppender extends MailAppender {
  /**
   * Simple Mail Appender.
   * @see {@link MailAppender}
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
    protected from?: string | Address | undefined,
    protected sender?: string | Address | undefined,
    protected to?: string | Address | Array<string | Address> | undefined,
    protected cc?: string | Address | Array<string | Address> | undefined,
    protected bcc?: string | Address | Array<string | Address> | undefined,
    subjTemplate?: string,
    msgTemplate?: string
  ) {
    super(options, from, sender, to, cc, bcc, subjTemplate, msgTemplate);
  }

  /**
   * Return string `"SimpleMail"`.
   */
  public get name(): string {
    return "SimpleMail";
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
        text: message.msg,
        priority: this.getPriority(event),
      });
    }
  }
}
