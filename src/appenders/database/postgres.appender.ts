import { ILoggingEvent } from "@logback4js/core";
import { Pool, PoolConfig } from "pg";
import { DatabaseAppender } from "./database.appender";


/**
 * PostgreSQL Appender.
 * 
 * @see {@link https://node-postgres.com|node-postgres}
 */
export class PostgresAppender extends DatabaseAppender {
    private pool: Pool;
    private params: ("logger" | "timestamp" | "level" | "message")[] = [];

    constructor(
        config: PoolConfig,
        query?: string
    ) {
        super(query);

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

        this.pool = new Pool(config);
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

    public get name(): string {
        return this.constructor.name;
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
