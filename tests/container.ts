import { notStrictEqual, strictEqual } from 'assert';
import Container from '../src/Container';

class Foo {
    public alternative: string = 'faz';
}

class Faz {
    public readonly sibling: Foo;

    public constructor(foo: Foo) {
        this.sibling = foo;
    }
}

class Baz {
    public readonly parent: Faz;

    public constructor(faz: Faz) {
        this.parent = faz;
    }
}

class State {
    protected hiddenState: object = {};

    public set state(state: object) {
        this.hiddenState = state;
    }

    public get state(): object {
        return this.hiddenState;
    }
}

class CallbackClass {
    public static callStatic(foo: Foo): string {
        return foo.alternative;
    }

    public call(foo: Foo): string {
        return foo.alternative;
    }
}

describe('Container', () => {
    describe('#bind', () => {
        it('should bind foo to the container', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);

            strictEqual(container.make<Foo>(Foo).alternative, 'faz');
        });

        it('should bind faz to the container with construction from another binded element', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);
            container.bind(Faz, (app: Container) => new Faz(app.make(Foo)));

            strictEqual(container.make<Faz>(Faz).sibling.alternative, 'faz');
        });

        it('should not be a singleton object', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);

            const foo1 = container.make(Foo);
            const foo2 = container.make(Foo);

            notStrictEqual(foo1, foo2);
        });

        it('shoud allow strings as well as objects', () => {
            const container = new Container;
            container.bind('Foo', () => new Foo);

            strictEqual(container.make<Foo>('Foo').alternative, 'faz');
        });
    });

    describe('#singleton', () => {
        it('should be equal to each other with basic dependency', () => {
            const container = new Container;
            container.singleton(Foo, () => new Foo);

            const foo1 = container.make(Foo);
            const foo2 = container.make(Foo);

            strictEqual(foo1, foo2);
        });

        it('should be equal with an object which depends on another dependency', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);
            container.singleton(Faz, (app: Container) => new Faz(app.make(Foo)));

            const faz1 = container.make(Faz);
            const faz2 = container.make(Faz);

            strictEqual(faz1, faz2);
        });

        it('shoud allow strings as well as objects', () => {
            const container = new Container;
            container.singleton('Foo', () => new Foo);

            strictEqual(
                container.make<Foo>('Foo').alternative,
                container.make<Foo>('Foo').alternative
            );
        });
    });

    describe('#make', () => {
        it('should inject binds into the constructor of an object which is not yet binded', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);
            const faz = container.make<Faz>(Faz);

            strictEqual(faz.sibling.alternative, 'faz');
        });

        it('should inject with multiple dependencies in a recursive fashion', () => {
            // NOTE: We have to bind faz as well since we can't find
            // the class unless it was bound to the window.
            const container = new Container;
            container.bind(Foo, () => new Foo);
            container.bind(Faz, (app: Container) => new Faz(app.make<Foo>(Foo)));
            const baz = container.make<Baz>(Baz);

            strictEqual(baz.parent.sibling.alternative, 'faz');
        });

        it('should be the same since it is a singleton', () => {
            const container = new Container;
            container.singleton(State, () => new State);

            const stateA = container.make<State>(State);
            stateA.state = { foo: 'bar' };

            const stateB = container.make<State>(State);

            strictEqual(stateA, stateB)
        });
    });

    describe('#call', () => {
        it('should call a function and pass through the correct bindings', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);

            const foo = container.make<Foo>(Foo);
            const result = container.call(function (foo: Foo): string {
                return foo.alternative;
            });

            strictEqual(foo.alternative, result);
        });

        it('should call an arrow function and pass through the correct bindings', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);

            const foo = container.make<Foo>(Foo);
            const result = container.call((foo: Foo): string => {
                return foo.alternative;
            });

            strictEqual(foo.alternative, result);
        });

        it('should call a callback static class method and pass through the correct bindings', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);

            const foo = container.make<Foo>(Foo);
            const result = container.call(CallbackClass.callStatic);

            strictEqual(foo.alternative, result);
        });

        it('should call a callback class method and pass through the correct bindings', () => {
            const container = new Container;
            container.bind(Foo, () => new Foo);
            const callable = new CallbackClass;

            const foo = container.make<Foo>(Foo);
            const result = container.call(callable.call);

            strictEqual(foo.alternative, result);
        });
    });
});
