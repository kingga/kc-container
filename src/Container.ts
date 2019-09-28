import IContainer from './contracts/IContainer';
import camelcase from 'camelcase';
import Service from './Service';
import Class from './Class';

export default class Container implements IContainer {
    private services: Map<string, Service> = new Map;
    private singletons: Map<string, any> = new Map;

    /**
     * Bind a class to the container and return a new one everytime 'make' is called.
     * @param name The name of the class or the class itself.
     * @param definition The function which returns a new instance of the class.
     */
    public bind<T>(name: Class<T>|string, definition: Function): void {
        const n = typeof name === 'string' ? name : name.name;

        this.services.set(n, {
            name: n,
            definition,
            type: 'service',
        });
    }

    /**
     * Bind a class to the container and cache it for multiple requests for it.
     * This will create a singleton so the same object will always be returned.
     * @param name The name of the class or the class itself.
     * @param definition The function which returns an instance of the class.
     */
    public singleton<T>(name: Class<T>|string, definition: Function): void {
        const n = typeof name === 'string' ? name : name.name;

        this.services.set(n, {
            name: n,
            definition,
            type: 'singleton',
        });
    }

    /**
     * Construct an object with dependency injection using binded objects in this
     * container.
     * @param name The name of the class which you want to create.
     */
    public make<T>(name: Class<T>|string): T {
        const n = typeof name === 'string' ? name : name.name;
        const service: Service|boolean = this.services.get(n) || false;

        if (service && service.type === 'singleton') {
            if (this.singletons.has(n)) {
                return this.singletons.get(n);
            } else {
                const singletonInstance = this.createInstance(service);
                this.singletons.set(n, singletonInstance);

                return singletonInstance;
            }
        } else if (service && service.type === 'service') {
            return this.createInstance(service);
        } else if (name instanceof Function) {
            // Try to create the object.
            return new name(...this.resolveDependencies(name));
        }
    }

    /**
     * Get a list of arguments which need to be based into this objects constructor.
     * @param obj The object to get the arguments from. This may be a bit hacky but its
     *            currently working with arrow functions and normal functions so I'm
     *            not going to complain.
     */
    protected getArgumentNames(obj: object): string[] {
        let str = obj.toString();
        let params: string[] = [];

        // Remove comments of the form /* ... */
        // Removing comments of the form //
        // Remove body of the function { ... }
        // removing '=>' if func is arrow function
        str = str.replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/(.)*/g, '')
            .replace(/{[\s\S]*}/, '')
            .replace(/=>/g, '')
            .trim();

        // Start parameter names after first '('
        const start = str.indexOf('(') + 1;

        // End parameter names is just before last ')'
        const end = str.length - 1;

        const results = str.substring(start, end).split(', ');

        results.forEach((result: string) => {
            // Removing any default value
            result = result.replace(/=[\s\S]*/g, '').trim();

            if (result.length > 0) {
                params.push(result);
            }
        });

        return params;
    }

    /**
     * Get a list of things which needs to be passed in and look inside
     * of the container for these items.
     * @param obj The object to resolve the dependencies for.
     */
    protected resolveDependencies(obj: object): any[] {
        const params = this.getArgumentNames(obj);
        let bindings: any[] = [];

        params.forEach((param: string) => {
            param = camelcase(param, {
                pascalCase: true,
            });

            bindings.push(this.make(param));
        });

        return bindings;
    }

    /**
     * Create a new instance using the services definition function and pass
     * and instance of this container into it just incase they don't want
     * to use arrow functions for some weird reason.
     * @param service The service to construct.
     */
    protected createInstance(service: Service): any {
        return service.definition(this);
    }
}
