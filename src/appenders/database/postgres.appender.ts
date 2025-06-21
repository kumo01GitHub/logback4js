import { ILoggingEvent } from "@logback4js/core";
import { DatabaseAppender } from "./database.appender";
import { Pool } from "pg";


/**
 * PostgreSQL Appender.
 * 
 * @see {@link https://node-postgres.com|node-postgres}
 */
export class PostgresAppender extends DatabaseAppender {
    private pool: Pool;
    private params: ("logger" | "timestamp" | "level" | "message")[] = [];

    constructor(
        url: string,
        query?: string
    ) {
        super(url, query);
        this.pool = new Pool({ connectionString: url });

        if (this.query.includes("logger")) {
            this.params.push("logger");
        }
        if (this.query.includes("timestamp")) {
            this.params.push("timestamp");
        }
        if (this.query.includes("level")) {
            this.params.push("level");
        }
        if (this.query.includes("message")) {
            this.params.push("message");
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getMessage(event: ILoggingEvent): { query: string, values: any[] } {
        let q = this.query;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values: any[] = [];

        this.params.forEach((param, i) => {
            switch (param) {
                case "logger":
                    q = q.replace(/\$\{\s*logger\s*\}/g, `$${i + 1}`);
                    values.push(event.logger);
                    break;
                case "timestamp":
                    q = q.replace(/\$\{\s*timestamp\s*\}/g, `$${i + 1}`);
                    values.push(event.timestamp);
                    break;
                case "level":
                    q = q.replace(/\$\{\s*level\s*\}/g, `$${i + 1}`);
                    values.push(event.level.label);
                    break;
                case "message":
                    q = q.replace(/\$\{\s*message\s*\}/g, `$${i + 1}`);
                    values.push(event.message);
                    break;
            }
        });
        return { query: q, values: values };
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            this.pool.connect((err, client) => {
                if (!err && client) {
                    const msg = this.getMessage(event);
                    client.query(msg.query, msg.values)
                        .finally(() => {
                            client.release(true);
                        });
                }
            });
        }
    }
}
