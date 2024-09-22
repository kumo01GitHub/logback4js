import { ILoggingEvent } from "./appender";
import { JsonAppender } from "./jsonAppender";

/**
 * IndexedDB Appender.
 */
export class IndexedDBAppender extends JsonAppender {
    constructor(
        private dbName: string,
        private storeName: string
    ) {
        super();
        const openRequest: IDBOpenDBRequest = indexedDB.open(this.dbName);
        openRequest.onupgradeneeded = (event: IDBVersionChangeEvent): void => {
            const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, {
                    autoIncrement: true
                });
            }
        }
        openRequest.onerror = (): void => {
            console.error("Failed to open IndexedDB");
        }
    }

    public get name(): string {
        return this.storeName;
    }

    public getMessage(event: ILoggingEvent): Object {
        return {
            timestamp: event.timestamp.toString(),
            logger: event.logger,
            level: event.level.label,
            message: event.message
        };
    }

    public doAppend(event: ILoggingEvent): void {
        if (!!event.level.priority) {
            const openRequest: IDBOpenDBRequest = indexedDB.open(this.constructor.name);
            openRequest.onsuccess = (e: Event): void => {
                const db: IDBDatabase = (e.target as IDBOpenDBRequest).result;
                const transaction: IDBTransaction = db.transaction(this.storeName, "readwrite");
                const store: IDBObjectStore = transaction.objectStore(this.storeName);
                store.put(this.getMessage(event));
                transaction.commit();
            }
            openRequest.onerror = (): void => {
                console.error("Failed to open IndexedDB");
            }
        }
    }
}
