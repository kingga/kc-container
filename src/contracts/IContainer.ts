import Class from '../Class';

export default interface IContainer {
    bind<T>(name: Class<T>|string, definition: Function): void
    singleton<T>(name: Class<T>|string, definition: Function): void
    make<T>(name: Class<T>|string): T;
    call<T>(callable: CallableFunction): T;
}
