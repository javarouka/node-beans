"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleScanner_1 = __importDefault(require("../ModuleScanner"));
test('basic', () => {
    const scanner = new ModuleScanner_1.default('./modules');
    scanner.scan();
    expect(0).toBe(0);
});
