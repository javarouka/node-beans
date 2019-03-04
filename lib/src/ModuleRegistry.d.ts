import LookupModule from './types/LookupModule';
import ModuleMetaInformation from './types/ModuleMetaInformation';
import ModuleType from './types/ModuleType';
declare class ModuleRegistry {
    private readonly requirePath;
    private readonly scanFilter;
    static setProfiles(target: any, profiles?: ActiveProfile[]): void;
    static exists(mt: any): boolean;
    static setMetaInformation(mt: any, info: ModuleMetaInformation): void;
    static getMetaInformation(mt: any): ModuleMetaInformation | undefined;
    static setModule(mt: string | ModuleType, mod: any): void;
    static getModule(mt: string | ModuleType): any;
    private static readonly profileMap;
    private static readonly moduleMetaInfo;
    private static readonly createdModule;
    private scanDir;
    private readonly initialized?;
    constructor(requirePath: string, scanFilter: (path: string) => RegExpMatchArray | null);
    initialize(): void;
    lookup<T>(target: string | ModuleType): LookupModule;
    lookupByMarker(marker: string | symbol): LookupModule[];
    readonly allModules: Map<string | ModuleType, any>;
    scan(): void;
    private postProcess;
    private isskipModuleRegistration;
}
export default ModuleRegistry;
