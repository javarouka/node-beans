"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PathHelper_1 = __importDefault(require("./PathHelper"));
class ModuleRegistry {
    constructor(requirePath, scanFilter) {
        this.requirePath = requirePath;
        this.scanFilter = scanFilter;
        this.scanDir = PathHelper_1.default.getRelaiveDirectory(requirePath, module.parent ? module.parent : module);
        console.debug('controller scan directory # ', this.scanDir);
    }
    static exists(mt) {
        return this.moduleMetaInfo.has(mt);
    }
    static setMetaInformation(mt, info) {
        if (this.exists(mt)) {
            return;
        }
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
    initialize() {
        this.scan();
    }
    lookup(target) {
        const mod = ModuleRegistry.getModule(target);
        const meta = ModuleRegistry.getMetaInformation(target);
        return {
            mod,
            meta
        };
    }
    lookupByMarker(marker) {
        const found = [];
        ModuleRegistry.createdModule.forEach((mod, key) => {
            const meta = ModuleRegistry.getMetaInformation(key);
            if (meta && meta.marker === marker) {
                found.push({ mod, meta });
                return;
            }
        });
        return found;
    }
    get allModules() {
        return ModuleRegistry.createdModule;
    }
    scan() {
        require('require-dir')(this.scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter(fullPath) {
                return fullPath.match(/Controller.(ts|js)$/);
            },
            mapValue(commonJSModule) {
                const mod = commonJSModule.default || commonJSModule;
                return mod;
            }
        });
        this.postProcess();
    }
    postProcess() {
        const dependencyRequiredModule = [];
        ModuleRegistry.moduleMetaInfo.forEach((meta, ModuleClz) => {
            if (typeof ModuleClz !== 'function') {
                ModuleRegistry.setModule(meta.name || ModuleClz, ModuleClz);
                return;
            }
            const { dependencies = [] } = meta;
            if (dependencies.length > 0) {
                dependencyRequiredModule.push(ModuleClz);
                return;
            }
            const mod = (typeof ModuleClz === 'function') ? new ModuleClz() : ModuleClz;
            ModuleRegistry.setModule(ModuleClz, mod);
        });
        dependencyRequiredModule.map(ModuleClz => {
            const info = ModuleRegistry.getMetaInformation(ModuleClz);
            if (!info) {
                ModuleRegistry.setModule(ModuleClz, new ModuleClz());
                return;
            }
            const { dependencies = [] } = info;
            const deps = dependencies.map(dep => {
                return ModuleRegistry.getModule(dep);
            });
            ModuleRegistry.setModule(ModuleClz, new ModuleClz(...deps));
        });
    }
}
ModuleRegistry.moduleMetaInfo = new Map();
ModuleRegistry.createdModule = new Map();
exports.default = ModuleRegistry;
