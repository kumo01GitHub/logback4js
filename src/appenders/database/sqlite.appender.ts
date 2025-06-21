import { ILoggingEvent } from "@logback4js/core";
import { DatabaseAppender } from "./database.appender";
import { Database } from "sqlite3";
import { basename } from "node:path";


/**
 * SQLite Appender.\
 * For now, using [node-sqlite3](https://github.com/TryGhost/node-sqlite3). It is planed to be migrate [node:sqlite](https://nodejs.org/api/sqlite.html#sqlite) after Node.js v20 is going to be EOL.
 */
export class SQLiteAppender extends DatabaseAppender {
    private database: Database;
    private readonly _dbname: string;

    constructor(
        filepath: string,
        query?: string,
    ) {
        super(filepath, query);
        this.database = new Database(filepath);
        this._dbname = basename(filepath);
    }

    public getMessage(
        // @ts-expect-error TS6133: 'event' is declared but its value is never read.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        event: ILoggingEvent
    ): string {
        return this.query
            .replace(/\$\{\s*logger\s*\}/g, "$logger")
            .replace(/\$\{\s*timestamp\s*\}/g, "$timestamp")
            .replace(/\$\{\s*level\s*\}/g, "$level")
            .replace(/\$\{\s*message\s*\}/g, "$message");
    }

    public get name(): string {
        return this._dbname;
    }

    public doAppend(event: ILoggingEvent): void {
        if (event.level.priority) {
            this.database.run(
                this.getMessage(event),
                {
                    $logger: event.logger,
                    $timestamp: event.timestamp.toISOString(),
                    $level: event.level.label,
                    $message: event.message,
                }
            );
        }
    }
}
