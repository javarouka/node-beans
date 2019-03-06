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
// @file ./modules/TestController.ts
import { Module } from 'module-registry'
import SomeModule from './SomeModule';

@Module({
    dependencies: [ SomeModule ],
    name: 'TestController',
    marker: 'Http',
    method: 'get',
    path: '/hello'
})
export default class TestController {
    constructor(
        public readonly somes: SomeModule) {
    }
    public hello() {
        return 'hello';
    }
}
```

```typescript
import ModuleRegistry from 'module-registry'

const registry = new ModuleRegistry('./modules', path => path.match(/\.Module.(ts|js)/));
registry.initialize();

const someModule = registry.lookup<TestController>('TestController');
console.log(someModule.hello())
```

## License
MIT