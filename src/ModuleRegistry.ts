import PathHelper from './PathHelper';
import { Managed } from './symbols';
import LookupModule from './types/LookupModule';
import ModuleType from './types/ModuleType';

const PROFILE = process.env.NODE_ENV as string;

class ModuleRegistry {

    public static setScanModule(mt: string, mod:any) {
        this.managedModule.set(mt, mod);
    }

    public static getScanModule(mt: any) {
        return this.managedModule.get(mt);
    }

    public static setModule(mt: string | ModuleType, mod:any) {
        this.createdModule.set(mt, mod);
    }

    public static getModule(mt: string | ModuleType) {
        return this.createdModule.get(mt);
    }

    private static readonly managedModule: Map<string, any> = new Map();
    private static readonly createdModule: Map<string | ModuleType, any> = new Map();

    public readonly scanDir: string;
    public initialized?: boolean = false;

    public get allModules(): Map<string | ModuleType, any> {
        return ModuleRegistry.createdModule;
    }

    constructor(
        private readonly requirePath:string, 
        private readonly scanFilter:(path:string) => RegExpMatchArray | null) {
        this.scanDir = PathHelper.getRelaiveDirectory(requirePath, module.parent ? module.parent : module);
        console.debug('> controller scan directory', this.scanDir);
    }

    public initialize() {
        if(this.initialized) {
            return;
        }
        this.initialized = true;
        ModuleRegistry.setModule(ModuleRegistry, this);
        this.scan();
    }

    public lookup<T>(target: ModuleType): LookupModule {
        const mod = ModuleRegistry.getModule(target) as T;
        const meta = this.getMetaDataFrom(target);
        return {
            mod,
            meta
        }
    }

    public lookupByMarker(marker: string | symbol): LookupModule[] {
        const found: LookupModule[] = []; 
        ModuleRegistry.createdModule.forEach((mod, key) => {
            const meta = this.getMetaDataFrom(mod);
            if(meta && meta.marker === marker) {
                found.push({mod, meta});
                return;
            }
        });
        return found;
    }

    public scan(): void {
        const modules = require('require-dir')(this.scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter: this.scanFilter,
            mapValue(commonJSModule: { default: new (...args: any[]) => {} }) {
                const mod = commonJSModule.default || commonJSModule;
                return mod;
            }
        });
        
        this.postProcess();
    }

    private getMetaDataFrom(target: ModuleType) {
        return Reflect.getMetadata(Managed, target);
    }

    private postProcess() {
        const dependencyRequiredModule:ModuleType[] = [];
        ModuleRegistry.managedModule.forEach(this.processNonDependencyModule(dependencyRequiredModule))
        dependencyRequiredModule.map(this.processDependencyModule());
    }

    private processDependencyModule(): (value: ModuleType, index: number) => void {
        return ModuleClz => {
            const meta = this.getMetaDataFrom(ModuleClz);
            if (!meta) {
                ModuleRegistry.setModule(ModuleClz, new ModuleClz());
                return;
            }
            const { dependencies = [] } = meta;
            const deps = dependencies.map((dep: string | ModuleType) => {
                return ModuleRegistry.getModule(dep);
            });
            ModuleRegistry.setModule(ModuleClz, new ModuleClz(...deps));
        };
    }

    private processNonDependencyModule(dependencyRequiredModule: ModuleType[]): (value: any, key: string) => void {
        return (ModuleClz, name) => {
            const meta = this.getMetaDataFrom(ModuleClz);
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
        };
    }
}

export default ModuleRegistry;