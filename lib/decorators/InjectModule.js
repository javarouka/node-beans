"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleRegistry_1 = __importDefault(require("../ModuleRegistry"));
const NormalModule = Symbol('@@NORMAL@@');
function InjectModule(meta = {}) {
    return (target) => {
        const info = {
            marker: meta.marker || NormalModule,
            dependencies: meta.dependencies || [],
            name: target.name,
            meta,
            module: target,
        };
        ModuleRegistry_1.default.setMetaInformation(target, info);
        return target;
    };
}
exports.default = InjectModule;
