# Module Registry

[![Build Status](https://travis-ci.org/javarouka/node-beans.svg)](https://travis-ci.org/javarouka/node-beans)

## Getting Started

```sh
npm i module-registry
```

## Usage

```typescript

import ModuleRegistry from 'module-registry'

const registry = new ModuleRegistry('./modules', path => path.match(/\.Module.(ts|js)/));
registry.initialize();

const someModuleByType = registry.lookup<SomeModule>(SomeModule);
const someModuleByName = registry.lookup<SomeModule>('SomeModule');
```

## License
MIT