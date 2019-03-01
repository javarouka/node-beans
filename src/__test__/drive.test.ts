import * as scanner from '../index'

test('basic', () => {
    scanner.scan('./modules')
    expect(0).toBe(0);
});