import ModuleRegistry from '../index';
import AController from './modules/AController';
import HttpController from './modules/HttpController';

test('all', () => {
    const registry = new ModuleRegistry('./modules', (fullPath: string) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();

    const found = registry.allModules

    expect(found.size).toBe(3);
});

test('lookup', () => {
    const registry = new ModuleRegistry('./modules', (fullPath: string) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();

    const {
        mod
    } = registry.lookup<AController>(AController);

    const expected = mod instanceof AController ? true : false;
    expect(expected).toBe(true);

    const found = registry.allModules

    expect(found.size).toBe(3);
});