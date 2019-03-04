"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
const symbols_1 = require("../src/symbols");
const AController_1 = __importDefault(require("./modules/AController"));
const IamNotInjectClass_1 = __importDefault(require("./modules/IamNotInjectClass"));
const registry = new index_1.default('./modules', (fullPath) => {
    return fullPath.match(/Controller.(ts|js)$/);
});
registry.initialize();
test('all', () => {
    const found = registry.allModules;
    expect(found.size).toBe(3);
    found.forEach(val => {
        const exists = val[symbols_1.Managed] || val.constructor[symbols_1.Managed];
        expect(exists).toBe(true);
    });
});
test('lookup Class', () => {
    const { mod: mod1 } = registry.lookup(AController_1.default);
    const expected1 = mod1 instanceof AController_1.default ? true : false;
    expect(expected1).toBe(true);
    expect(!!mod1.config).toBe(true);
    expect(!!mod1.bController).toBe(true);
});
test('lookup class not exists', () => {
    const { mod } = registry.lookup(IamNotInjectClass_1.default);
    const expected1 = mod instanceof IamNotInjectClass_1.default ? true : false;
    expect(expected1).toBe(false);
});
test('lookup object', () => {
    const { mod: mod2 } = registry.lookup('PlainModule');
    expect(mod2.hello).toBe('world');
});
