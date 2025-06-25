import { ILoggingEvent } from "@logback4js/core";
import { Pool, createPool, escape } from "mysql2/promise";
import iconv from "iconv-lite/lib";
import { DatabaseAppender } from "./database.appender";


/**
 * MySQL Appender.
 * @extends DatabaseAppender
 * @see {@link https://sidorares.github.io/node-mysql2/docs|MySQL2}
 */
export class MySQLAppender extends DatabaseAppender {
    private pool: Pool;

    /**
     * MySQL Appender.
     * @see {@link DatabaseAppender}
     */
    constructor(
        url: string,
        query?: string
    ) {
        super(url, query);
        iconv.encodingExists("utf8");

        this.pool = createPool({
            uri: url,
            namedPlaceholders: true,
            queryFormat: (query, values) => {
                if (!values) return query;
                return query.replace(/\$\{\s*(\w+)\s*\}/g, function (txt: string, key: string) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (values.hasOwnProperty(key)) {
                        return escape(values[key]);
                    }
                    return txt;
                }.bind(this));
            },
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getMessage(event: ILoggingEvent): { query: string, values: any } {
        return { query: this.query, values: event };
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            const msg = this.getMessage(event);
            this.pool.query(msg.query, msg.values);
        }
    }
}