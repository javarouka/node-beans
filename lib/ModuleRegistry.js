"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PathHelper_1 = __importDefault(require("./PathHelper"));
const symbols_1 = require("./symbols");
const PROFILE = process.env.NODE_ENV;
class ModuleRegistry {
    constructor(requirePath, scanFilter) {
        this.requirePath = requirePath;
        this.scanFilter = scanFilter;
        this.initialized = false;
        this.scanDir = PathHelper_1.default.getRelaiveDirectory(requirePath, module.parent ? module.parent : module);
        console.debug('> controller scan directory', this.scanDir);
    }
    static setScanModule(mt, mod) {
        this.managedModule.set(mt, mod);
    }
    static getScanModule(mt) {
        return this.managedModule.get(mt);
    }
    static setModule(mt, mod) {
        this.createdModule.set(mt, mod);
    }
    static getModule(mt) {
        return this.createdModule.get(mt);
    }
    get allModules() {
        return ModuleRegistry.createdModule;
    }
    initialize() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        ModuleRegistry.setModule(ModuleRegistry, this);
        this.scan();
    }
    lookup(target) {
        const mod = ModuleRegistry.getModule(target);
        const meta = Reflect.getMetadata(symbols_1.Managed, target);
        return {
            mod,
            meta
        };
    }
    lookupByMarker(marker) {
        const found = [];
        ModuleRegistry.createdModule.forEach((mod, key) => {
            const meta = Reflect.getMetadata(symbols_1.Managed, mod);
            if (meta && meta.marker === marker) {
                found.push({ mod, meta });
                return;
            }
        });
        return found;
    }
    scan() {
        require('require-dir')(this.scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter: this.scanFilter,
            mapValue(commonJSModule) {
                const mod = commonJSModule.default || commonJSModule;
                return mod;
            }
        });
        this.postProcess();
    }
    postProcess() {
        const dependencyRequiredModule = [];
        ModuleRegistry.managedModule.forEach((ModuleClz, name) => {
            const meta = Reflect.getMetadata(symbols_1.Managed, ModuleClz);
            if (typeof ModuleClz !== 'function') {
                ModuleRegistry.setModule(name || meta.name || ModuleClz, ModuleClz);
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
            const meta = Reflect.getMetadata(symbols_1.Managed, ModuleClz);
            if (!meta) {
                ModuleRegistry.setModule(ModuleClz, new ModuleClz());
                return;
            }
            const { dependencies = [] } = meta;
            const deps = dependencies.map((dep) => {
                return ModuleRegistry.getModule(dep);
            });
            ModuleRegistry.setModule(ModuleClz, new ModuleClz(...deps));
        });
    }
}
ModuleRegistry.managedModule = new Map();
ModuleRegistry.createdModule = new Map();
exports.default = ModuleRegistry;
