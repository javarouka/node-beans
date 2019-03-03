import PathHelper from './PathHelper';
import LookupModule from './types/LookupModule';
import ModuleMetaInformation from './types/ModuleMetaInformation';
import ModuleType from './types/ModuleType';

class ModuleRegistry {

    public static exists(mt: any) {
        return this.moduleMetaInfo.has(mt);
    }

    public static setMetaInformation(mt: any, info:ModuleMetaInformation) {
        if(this.exists(mt)) {
            return;
        }
        this.moduleMetaInfo.set(mt, info);
    }

    public static getMetaInformation(mt: any) {
        return this.moduleMetaInfo.get(mt);
    }

    public static setModule(mt: string | ModuleType, mod:any) {
        this.createdModule.set(mt, mod);
    }

    public static getModule(mt: string | ModuleType) {
        return this.createdModule.get(mt);
    }

    private static readonly moduleMetaInfo: Map<ModuleType, ModuleMetaInformation> = new Map();
    private static readonly createdModule: Map<string | ModuleType, any> = new Map();

    private scanDir: string;
    private readonly initialized?: boolean = false;

    constructor(
        private readonly requirePath:string, 
        private readonly scanFilter:(path:string) => RegExpMatchArray | null) {
        this.scanDir = PathHelper.getRelaiveDirectory(requirePath, module.parent ? module.parent : module);
        console.debug('controller scan directory # ', this.scanDir);
    }

    public initialize() {
        if(this.initialized) {
            return;
        }
        this.scan();
    }

    public lookup<T>(target: string | ModuleType): LookupModule {
        const mod = ModuleRegistry.getModule(target) as T;
        const meta = ModuleRegistry.getMetaInformation(target);
        return {
            mod,
            meta
        }
    }

    public lookupByMarker(marker: string | symbol): LookupModule[] {
        const found: LookupModule[] = []; 
        ModuleRegistry.createdModule.forEach((mod, key) => {
            const meta = ModuleRegistry.getMetaInformation(key);
            if(meta && meta.marker === marker) {
                found.push({mod, meta});
                return;
            }
        });
        return found;
    }

    get allModules(): Map<string | ModuleType, any> {
        return ModuleRegistry.createdModule;
    }

    public scan(): void {
        require('require-dir')(this.scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter(fullPath: string) {
                return fullPath.match(/Controller.(ts|js)$/);
            },
            mapValue(commonJSModule: { default: new (...args: any[]) => {} }) {
                const mod = commonJSModule.default || commonJSModule;
                return mod;
            }
        });
        
        this.postProcess();
    }

    private postProcess() {

        const dependencyRequiredModule:ModuleType[] = [];

        ModuleRegistry.moduleMetaInfo.forEach((meta, ModuleClz) => {

            if(typeof ModuleClz !== 'function') {
                ModuleRegistry.setModule(meta.name || ModuleClz, ModuleClz);
                return;
            }

            const { dependencies = [] } = meta;
            if(dependencies.length > 0) {
                dependencyRequiredModule.push(ModuleClz);
                return;
            }
            const mod = (typeof ModuleClz === 'function') ? new ModuleClz() : ModuleClz;
            ModuleRegistry.setModule(ModuleClz, mod);
        });

        dependencyRequiredModule.map(ModuleClz => {
            const info = ModuleRegistry.getMetaInformation(ModuleClz);
            if(!info) {
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

export default ModuleRegistry;