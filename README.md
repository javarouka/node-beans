# !!! Deprecated
# Module Registry

[![npm package](https://img.shields.io/npm/v/module-registry/latest.svg)](https://www.npmjs.com/package/module-registry)
[![npm downloads](https://img.shields.io/npm/dm/module-registry.svg)](https://www.npmjs.com/package/module-registry)
[![Build Status](https://travis-ci.org/javarouka/node-beans.svg)](https://travis-ci.org/javarouka/node-beans)

## Getting Started

```sh
npm i module-registry
```

## Usage

```typescript
import { Module } from 'module-registry'

@Module({
    name: 'SomeModule',
})
export default class SomeModule {
    public hello() {
        return 'hello';
    }
}

@Module({
    dependencies: [ SomeModule ],
    name: 'TestController',
    marker: 'Http',
    method: 'get',
    path: '/hello'
})
export default class TestControllerModule {
    constructor(
        public readonly somes: SomeModule) {
    }
    public work() {
        return somes.hello();
    }
}
```

```typescript
import ModuleRegistry from 'module-registry'

const registry = new ModuleRegistry('./modules', path => path.match(/\.Module.(ts|js)/));
registry.initialize();

const someModule = registry.lookup<TestControllerModule>('TestController');
console.log(someModule.hello())
```

## License
MIT