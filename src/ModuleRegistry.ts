import PathHelper from './PathHelper';
import ModuleMetaInformation from './types/ModuleMetaInformation';
import ModuleType from './types/ModuleType';

class ModuleRegistry {

    public static setMetaInformation(mt: ModuleType, info:ModuleMetaInformation) {
        this.moduleMetaInfo.set(mt, info);
    }

    public static getMetaInformation(mt: ModuleType) {
        return this.moduleMetaInfo.get(mt);
    }

    public static setModule(mt: ModuleType, mod:any) {
        this.createdModule.set(mt, mod);
    }

    public static getModule(mt: ModuleType) {
        return this.createdModule.get(mt);
    }

    private static readonly moduleMetaInfo: Map<ModuleType, ModuleMetaInformation> = new Map();
    private static readonly createdModule: Map<ModuleType, any> = new Map();

    private scanDir: string;

    constructor(
        private readonly requirePath:string, 
        private readonly scanFilter:(path:string) => RegExpMatchArray | null) {

        this.scanDir = PathHelper.getRelaiveDirectory(requirePath, module.parent ? module.parent : module);
        console.debug('controller scan directory # ', this.scanDir);
    }

    public initialize() {
        this.scan();
    }

    public lookup<T>(target: ModuleType): {
        mod: T,
        meta?: ModuleMetaInformation
    } {
        const mod = ModuleRegistry.getModule(target) as T;
        const meta = ModuleRegistry.getMetaInformation(target);
        return {
            mod,
            meta
        }
    }

    public lookupByMarker(marker: string | symbol) {
        const found: Map<any, ModuleMetaInformation> = new Map(); 
        ModuleRegistry.createdModule.forEach((val, key) => {
            const meta = ModuleRegistry.getMetaInformation(key);
            if(meta && meta.marker === marker) {
                found.set(val, meta);
                return;
            }
        });
        return found;
    }

    get allModules(): Map<ModuleType, any> {
        return ModuleRegistry.createdModule;
    }

    private scan(): void {
        const loadModule = require('require-dir')(this.scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter(fullPath: string) {
                return fullPath.match(/Controller.(ts|js)$/);
            },
            mapValue(commonJSModule: { default: new (...args: any[]) => {} }) {
                return commonJSModule.default;
            }
        });
        
        this.postProcess(loadModule);
    }

    private postProcess(loadModule: Readonly<{
        [prop:string]: ModuleType
    }>) {

        const metaModules:ModuleType[] = [];

        Object.keys(loadModule)
            .forEach((key) => {
                const ModuleClz = loadModule[key];
                if(!ModuleRegistry.getMetaInformation(ModuleClz)) {
                    if(ModuleClz.constructor.name === 'Object') {
                        return;
                    }
                    ModuleRegistry.setModule(ModuleClz, new ModuleClz());
                    return;
                }
                metaModules.push(ModuleClz)
            });

        metaModules.map(ModuleClz => {
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