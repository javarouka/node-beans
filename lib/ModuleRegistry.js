"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModuleRegistry {
    static setMetaInformation(mt, info) {
        this.moduleMetaInfo.set(mt, info);
    }
    static getMetaInformation(mt) {
        return this.moduleMetaInfo.get(mt);
    }
    static setModule(mt, mod) {
        this.createdModule.set(mt, mod);
    }
    static getModule(mt) {
        return this.createdModule.get(mt);
    }
    static forEachMetaInfo(iter) {
        ModuleRegistry.moduleMetaInfo.forEach(iter);
    }
}
ModuleRegistry.moduleMetaInfo = new Map();
ModuleRegistry.createdModule = new WeakMap();
exports.default = ModuleRegistry;
