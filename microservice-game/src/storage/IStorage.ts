interface IStorage<T> {
    set(key: string, value: T): Promise<void>;
    get(key: string): Promise<T | undefined>;
    getValues(): Promise<T[]>;  // Assuming you want to get all values stored in the storage
    delete(key: string): Promise<boolean>;
    has(key: string): Promise<boolean>;
    clear(): Promise<void>;
    size(): Promise<number>;
}

export default IStorage;