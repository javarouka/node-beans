"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleRegistry_1 = __importDefault(require("../ModuleRegistry"));
const NormalModule = Symbol('@@NORMAL@@');
function InjectModule(meta = {}) {
    return (target) => {
        if (ModuleRegistry_1.default.exists(target)) {
            return target;
        }
        const { name = '', marker = '', dependencies = [] } = meta;
        const info = {
            marker: marker || NormalModule,
            dependencies: dependencies || [],
            name: name || target.name,
            meta,
            module: target,
        };
        ModuleRegistry_1.default.setMetaInformation(target, info);
        return target;
    };
}
exports.default = InjectModule;
