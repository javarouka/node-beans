import ModuleRegistry from '../index';
import AController from './modules/AController';
import IamNotInjectClass from './modules/IamNotInjectClass';

test('all', () => {
    const registry = new ModuleRegistry('./modules', (fullPath: string) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();

    const found = registry.allModules

    expect(found.size).toBe(3);
});

test('lookup Class', () => {
    const registry = new ModuleRegistry('./modules', (fullPath: string) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();

    const {
        mod:mod1
    } = registry.lookup<AController>(AController);

    const expected1 = mod1 instanceof AController ? true : false;
    expect(expected1).toBe(true);

    expect(!!mod1.config).toBe(true);
    expect(!!mod1.bController).toBe(true);
});


test('lookup class not exists', () => {
    const registry = new ModuleRegistry('./modules', (fullPath: string) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();

    const {
        mod
    } = registry.lookup<IamNotInjectClass>(IamNotInjectClass);

    const expected1 = mod instanceof IamNotInjectClass ? true : false;
    expect(expected1).toBe(false);
});

test('lookup object', () => {
    const registry = new ModuleRegistry('./modules', (fullPath: string) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();

    const {
        mod:mod2
    } = registry.lookup('PlainModule');

    expect(mod2.hello).toBe('world');
});