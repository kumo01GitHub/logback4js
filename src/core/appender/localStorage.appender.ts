import { v4 as uuid } from 'uuid';
import { ILoggingEvent } from "./appender";
import { TextAppender } from './textAppender';

/**
 * LocalStorage Appender. The key is UUID.
 */
export class LocalStorageAppender extends TextAppender {
    constructor(
        private keyPrefix: string,
        template?: string
    ) {
        super(template);
    }

    public get name(): string {
        return this.keyPrefix;
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            localStorage.setItem(
                this.generateKey(),
                this.getMessage(event)
            );
        }
    }

    private generateKey(): string {
        return this.keyPrefix + "." + uuid();
    }
}
