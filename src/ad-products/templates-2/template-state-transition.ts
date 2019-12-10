export type Transition<T extends string> = (targetStateKey: keyof T) => Promise<void>;
