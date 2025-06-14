import { ILoggingEvent } from "@logback4js/core";
import { createConnection, Connection, escape } from "mysql2";
import { DatabaseAppender } from "./database.appender";


/**
 * MySQL Appender.
 * 
 * @see {@link https://sidorares.github.io/node-mysql2/docs|MySQL2}
 */
export class MySQLAppender extends DatabaseAppender {
    private connection: Connection;

    constructor(
        connectionUri: string,
        query?: string
    ) {
        super(query);

        this.connection = createConnection(connectionUri);
        this.connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\$\{\s*(\w+)\s*\}/g, function (txt: string, key: string) {
                if (values.hasOwnProperty(key)) {
                    return escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
    }

    // @ts-expect-error TS6133: 'event' is declared but its value is never read.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getMessage(event: ILoggingEvent): string {
        return this.query;
    }

    public get name(): string {
        return this.constructor.name;
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            this.connection.query(this.getMessage(event), event);
        }
    }
}
