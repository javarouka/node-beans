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

    public static forEachMetaInfo(iter: (meta:ModuleMetaInformation, type: ModuleType, map?:Map<ModuleType, ModuleMetaInformation>) => void): void {
        ModuleRegistry.moduleMetaInfo.forEach(iter);
    }

    private static readonly moduleMetaInfo: Map<ModuleType, ModuleMetaInformation> = new Map();
    private static readonly createdModule: WeakMap<ModuleType, any> = new WeakMap();

    // private readonly scanner: ModuleScanner;

    // constructor(
    //     private readonly requirePath:string, 
    //     private readonly scanFilter:(path:string) => RegExpMatchArray | un) {

    //     const getScanDirectory = (dir: string) => {
    //         const parent = module.parent;
    //         console.log(parent);
    //         if (!parent) {
    //             return path.resolve(__dirname, dir);
    //         }

    //         const parentFile = parent.filename;
    //         const parentDir = path.dirname(parentFile);
    //         return path.resolve(parentDir, dir);
    //     };

    //     const scanDir = getScanDirectory(requirePath);
    //     console.debug('controller scan directory # ', scanDir);

    //     this.scanner = new ModuleScanner(scanDir, scanFilter);
    // }

    // public initialize() {
    //     this.scanner.scan();
    // }
}

export default ModuleRegistry;