import Class from '../Class';

export type HookFor<T> = Class<T> | string;
export type HookFunction<T> = (service: T, app: IContainer) => void;

export default interface IContainer {
    bind<T>(name: Class<T>|string, definition: Function): void
    singleton<T>(name: Class<T>|string, definition: Function): void
    make<T>(name: Class<T>|string): T;
    call<T>(callable: CallableFunction): T;
    resolving<T>(resolver: HookFunction<T>, name?: HookFor<T>[]): void;
    resolved<T>(resolver: HookFunction<T>, name?: HookFor<T>[]): void;
    extend<T>(name: Class<T>|string, definition: (service: T, app: IContainer) => T): void;
}
