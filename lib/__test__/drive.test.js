"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const AController_1 = __importDefault(require("./modules/AController"));
test('all', () => {
    const registry = new index_1.default('./modules', (fullPath) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();
    const found = registry.allModules;
    expect(found.size).toBe(3);
});
test('lookup', () => {
    const registry = new index_1.default('./modules', (fullPath) => {
        return fullPath.match(/Controller.(ts|js)$/);
    });
    registry.initialize();
    const { mod } = registry.lookup(AController_1.default);
    const expected = mod instanceof AController_1.default ? true : false;
    expect(expected).toBe(true);
    const found = registry.allModules;
    expect(found.size).toBe(3);
});
