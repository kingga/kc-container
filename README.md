# Kings Collection IoC Container
[![Build Status](https://travis-ci.com/kingga/kc-container.svg?branch=master)](https://travis-ci.com/kingga/kc-container)

A simple IoC container for the kings collection.

## Installation
### Yarn
`yarn add kc-container`

### NPM
`npm i kc-container`

## Usage
```ts
import Container from 'kc-container';

const container = new Container;

class Foo {
    toString(): string {
        return 'foo';
    }
}

class Faz {
    public readonly foo: Foo;

    public constructor(foo: Foo) {
        this.foo = foo;
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

// Simple bindings.
container.bind(Foo, () => new Foo);
container.bind(Faz.name, (app: Container) => new Faz(app.make<Foo>(Foo)));

// Singletons.
container.singleton(State, () => new State);

// Getting something from the container.
const stateA = container.make<State>(State);
stateA.state = { foo: 'bar' };

const stateB = container.make<State>(State);
it('should be the same since it is a singleton', () => strictEqual(stateA, stateB));
```
