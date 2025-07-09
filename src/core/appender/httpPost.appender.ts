import axios, { type AxiosRequestConfig } from "axios";
import { type ILoggingEvent } from "./appender";
import { JsonAppender } from "./json.appender";

/**
 * HTTP POST Appender.
 * @extends JsonAppender
 */
export class HttpPostAppender extends JsonAppender {
  /**
   * HTTP POST Appender.
   * @param {string} url API URL.
   * @param {AxiosRequestConfig<any>} config Axios request configuration.
   * @param {{ [key: string]: string }} template Log message template.
   */
  constructor(
    private url: string,
    private config?: AxiosRequestConfig<any>, // eslint-disable-line
    template?: { [key: string]: string }
  ) {
    super(template);
  }

  /**
   * Host name.
   */
  public get name(): string {
    return new URL(this.url).hostname;
  }

  public doAppend(event: ILoggingEvent): void {
    if (event.level.priority) {
      axios.post(this.url, this.getMessage(event), this.config);
    }
  }
}
