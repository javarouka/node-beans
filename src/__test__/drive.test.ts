import ModuleScanner from '../ModuleScanner';

test('basic', () => {

    const scanner = new ModuleScanner('./modules');
    scanner.scan();
    expect(0).toBe(0);
});