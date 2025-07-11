import { createTransport, Transporter } from "nodemailer";
import { Appender, type ILoggingEvent, LogLevel } from "@logback4js/core";

/**
 * Replica of nodemailer address definition.
 */
export interface Address {
  name: string;
  address: string;
}

/**
 * Mail Appender.
 * @see {@link https://nodemailer.com|Nodemailer}
 */
export abstract class MailAppender implements Appender {
  protected transporter: Transporter;
  private static readonly DEFAULT_SUBJ_TEMPLATE: string =
    "[${logger}] ${level} - ${appender}";
  private static readonly DEFAULT_MSG_TEMPLATE: string = "${message}";

  /**
   * Mail Appender.
   * @param {any} options {@link createTransport} options.
   * @param {string | Address | undefined} from From.
   * @param {string | Address | undefined} sender Sender.
   * @param {string | Address | Array<string | Address> | undefined} to To.
   * @param {string | Address | Array<string | Address> | undefined} cc CC.
   * @param {string | Address | Array<string | Address> | undefined} bcc BCC.
   * @param {string} subjTemplate Subject template.
   * @param {string} msgTemplate Message template.
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any,
    protected from?: string | Address | undefined,
    protected sender?: string | Address | undefined,
    protected to?: string | Address | Array<string | Address> | undefined,
    protected cc?: string | Address | Array<string | Address> | undefined,
    protected bcc?: string | Address | Array<string | Address> | undefined,
    private subjTemplate: string = MailAppender.DEFAULT_SUBJ_TEMPLATE,
    private msgTemplate: string = MailAppender.DEFAULT_MSG_TEMPLATE
  ) {
    this.transporter = createTransport(options);
  }

  /**
   * Get subject/message using template.
   * @param {ILoggingEvent} event logging event
   * @returns {string} subject
   * @returns {string} message
   */
  public getMessage(event: ILoggingEvent): {
    subj: string;
    msg: string;
  } {
    return {
      subj: this.subjTemplate
        .replace(/\$\{\s*logger\s*\}/g, event.logger)
        .replace(/\$\{\s*timestamp\s*\}/g, event.timestamp.toString())
        .replace(/\$\{\s*level\s*\}/g, event.level.label)
        .replace(/\$\{\s*message\s*\}/g, event.message)
        .replace(/\$\{\s*appender\s*\}/g, this.name),
      msg: this.msgTemplate
        .replace(/\$\{\s*logger\s*\}/g, event.logger)
        .replace(/\$\{\s*timestamp\s*\}/g, event.timestamp.toString())
        .replace(/\$\{\s*level\s*\}/g, event.level.label)
        .replace(/\$\{\s*message\s*\}/g, event.message)
        .replace(/\$\{\s*appender\s*\}/g, this.name),
    };
  }

  /**
   * Get priority.
   * @param {ILoggingEvent} event logging event
   * @returns {"high" | "normal" | "low" | undefined} priority
   */
  protected getPriority(
    event: ILoggingEvent
  ): "high" | "normal" | "low" | undefined {
    let priority: "high" | "normal" | "low" | undefined;

    switch (event.level) {
      case LogLevel.None:
        break;
      case LogLevel.Trace:
        priority = "low";
        break;
      case LogLevel.Debug:
        priority = "low";
        break;
      case LogLevel.Info:
        priority = "normal";
        break;
      case LogLevel.Warn:
        priority = "normal";
        break;
      case LogLevel.Error:
        priority = "high";
        break;
    }

    return priority;
  }

  /**
   * Appender name. Logger uses for key to manage Appenders.
   */
  public get name(): string {
    return "Mail";
  }

  /**
   * Do append.
   * @param {ILoggingEvent} event Logging event.
   */
  abstract doAppend(event: ILoggingEvent): void;
}
