import IContainer, { HookFor, HookFunction } from './contracts/IContainer';
import Service from './Service';
import Class from './Class';
declare type ExtensionCallable<T> = (service: T, app: IContainer) => T;
declare type HookType = 'resolving' | 'resolved';
interface HookInfo<T> {
    bindings?: HookFor<T>[];
    hook: HookFunction<T>;
}
export default class Container implements IContainer {
    private services;
    private singletons;
    private extensions;
    private hooks;
    /**
     * Bind a class to the container and return a new one everytime 'make' is called.
     * @param name The name of the class or the class itself.
     * @param definition The function which returns a new instance of the class.
     */
    bind<T>(name: Class<T> | string, definition: Function): void;
    /**
     * Bind a class to the container and cache it for multiple requests for it.
     * This will create a singleton so the same object will always be returned.
     * @param name The name of the class or the class itself.
     * @param definition The function which returns an instance of the class.
     */
    singleton<T>(name: Class<T> | string, definition: Function): void;
    /**
     * Construct an object with dependency injection using binded objects in this
     * container.
     * @param name The name of the class which you want to create.
     */
    make<T>(name: Class<T> | string): T;
    resolving<T>(resolver: HookFunction<T>, name?: HookFor<T>[]): void;
    resolved<T>(resolver: HookFunction<T>, name?: HookFor<T>[]): void;
    extend<T>(name: Class<T> | string, definition: ExtensionCallable<T>): void;
    protected addHook<T>(name: HookType, hook: HookInfo<T>): void;
    protected runHooks(type: HookType, name: string, service: any): void;
    /**
     * Call a function and try to bind it's arguments.
     * @param callable The function/method which you would like to call and bind parameters to.
     */
    call<T>(callable: CallableFunction): T;
    /**
     * Scan through an ES6 class for it's constructor.
     * @param cls The classes object after toString() is ran on it.
     */
    protected scanForConstructor(cls: string): string;
    /**
     * Get a list of arguments which need to be based into this objects constructor.
     * @param obj The object to get the arguments from. This may be a bit hacky but its
     *            currently working with arrow functions and normal functions so I'm
     *            not going to complain.
     */
    protected getArgumentNames(obj: object): string[];
    /**
     * Get a list of things which needs to be passed in and look inside
     * of the container for these items.
     * @param obj The object to resolve the dependencies for.
     */
    protected resolveDependencies(obj: object): any[];
    /**
     * Create a new instance using the services definition function and pass
     * and instance of this container into it just incase they don't want
     * to use arrow functions for some weird reason.
     * @param service The service to construct.
     */
    protected createInstance(service: Service): any;
}
export {};
