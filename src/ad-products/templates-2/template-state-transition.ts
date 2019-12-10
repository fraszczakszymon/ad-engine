export type Transition<T extends string = any> = (targetStateKey: keyof T) => Promise<void>;
