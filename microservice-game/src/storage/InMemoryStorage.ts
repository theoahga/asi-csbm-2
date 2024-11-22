import IStorage from './IStorage';

class InMemoryStorage<T> implements IStorage<T> {
    private storage: Map<string, T>;

    constructor() {
        this.storage = new Map();
    }

    async set(key: string, value: T): Promise<void> {
        this.storage.set(key, value);
    }

    async get(key: string): Promise<T | undefined> {
        return this.storage.get(key);
    }

    async getValues(): Promise<T[]> {
        return Array.from(this.storage.values());
    }

    async delete(key: string): Promise<boolean> {
        return this.storage.delete(key);
    }

    async has(key: string): Promise<boolean> {
        return this.storage.has(key);
    }

    async clear(): Promise<void> {
        this.storage.clear();
    }

    async size(): Promise<number> {
        return this.storage.size;
    }
}

export default InMemoryStorage;
