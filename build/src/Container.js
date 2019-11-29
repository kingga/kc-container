"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pascalcase_1 = require("./helpers/pascalcase");
class Container {
    constructor() {
        this.services = new Map;
        this.singletons = new Map;
        this.extensions = new Map;
        this.hooks = {
            resolving: [],
            resolved: [],
        };
    }
    /**
     * Bind a class to the container and return a new one everytime 'make' is called.
     * @param name The name of the class or the class itself.
     * @param definition The function which returns a new instance of the class.
     */
    bind(name, definition) {
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
    singleton(name, definition) {
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
    make(name) {
        const n = typeof name === 'string' ? name : name.name;
        const service = this.services.get(n) || false;
        let instance;
        this.runHooks('resolving', n, n);
        if (service && service.type === 'singleton') {
            if (this.singletons.has(n)) {
                instance = this.singletons.get(n);
            }
            else {
                instance = this.createInstance(service);
                this.singletons.set(n, instance);
            }
        }
        else if (service && service.type === 'service') {
            instance = this.createInstance(service);
        }
        else if (name instanceof Function) {
            // Try to create the object.
            instance = new name(...this.resolveDependencies(name));
        }
        if (instance) {
            // Add on the extensions.
            if (typeof this.extensions[n] !== 'undefined') {
                this.extensions[n].forEach((extension) => {
                    instance = extension(instance, this);
                });
            }
            this.runHooks('resolved', n, instance);
            return instance;
        }
    }
    resolving(resolver, name) {
        this.addHook('resolving', {
            bindings: name,
            hook: resolver,
        });
    }
    resolved(resolver, name) {
        this.addHook('resolved', {
            bindings: name,
            hook: resolver,
        });
    }
    extend(name, definition) {
        const n = typeof name === 'string' ? name : name.name;
        if (typeof this.extensions[n] === 'undefined') {
            this.extensions[n] = [];
        }
        this.extensions[n].push(definition);
    }
    addHook(name, hook) {
        this.hooks[name].push(hook);
    }
    runHooks(type, name, service) {
        this.hooks[type].forEach((hook) => {
            const correctBinding = hook.bindings
                ? (hook.bindings || []).some((binding) => binding === name)
                : true;
            if (correctBinding) {
                hook.hook(service, this);
            }
        });
    }
    /**
     * Call a function and try to bind it's arguments.
     * @param callable The function/method which you would like to call and bind parameters to.
     */
    call(callable) {
        const args = this.resolveDependencies(callable);
        return callable(...args);
    }
    /**
     * Scan through an ES6 class for it's constructor.
     * @param cls The classes object after toString() is ran on it.
     */
    scanForConstructor(cls) {
        const pos = cls.indexOf('constructor');
        cls = cls.substr(pos);
        const end = cls.indexOf('{');
        cls = cls.substr(0, end);
        return cls;
    }
    /**
     * Get a list of arguments which need to be based into this objects constructor.
     * @param obj The object to get the arguments from. This may be a bit hacky but its
     *            currently working with arrow functions and normal functions so I'm
     *            not going to complain.
     */
    getArgumentNames(obj) {
        let str = obj.toString();
        let params = [];
        // Check if it's an ES6 class.
        if (str.substr(0, 5) === 'class') {
            str = this.scanForConstructor(str);
        }
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
        results.forEach((result) => {
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
    resolveDependencies(obj) {
        const params = this.getArgumentNames(obj);
        let bindings = [];
        params.forEach((param) => {
            bindings.push(this.make(pascalcase_1.pascalcase(param)));
        });
        return bindings;
    }
    /**
     * Create a new instance using the services definition function and pass
     * and instance of this container into it just incase they don't want
     * to use arrow functions for some weird reason.
     * @param service The service to construct.
     */
    createInstance(service) {
        return service.definition(this);
    }
}
exports.default = Container;
