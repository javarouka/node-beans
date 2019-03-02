import ModuleMetaInformation from './types/ModuleMetaInformation';
import ModuleType from './types/ModuleType';
declare class ModuleRegistry {
    private readonly requirePath;
    private readonly scanFilter;
    static setMetaInformation(mt: ModuleType, info: ModuleMetaInformation): void;
    static getMetaInformation(mt: ModuleType): ModuleMetaInformation | undefined;
    static setModule(mt: ModuleType, mod: any): void;
    static getModule(mt: ModuleType): any;
    private static readonly moduleMetaInfo;
    private static readonly createdModule;
    private scanDir;
    constructor(requirePath: string, scanFilter: (path: string) => RegExpMatchArray | null);
    initialize(): void;
    lookup<T>(target: ModuleType): {
        mod: T;
        meta?: ModuleMetaInformation;
    };
    lookupByMarker(marker: string | symbol): Map<any, ModuleMetaInformation>;
    readonly allModules: Map<ModuleType, any>;
    private scan;
    private postProcess;
}
export default ModuleRegistry;
