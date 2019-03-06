import LookupModule from './types/LookupModule';
import ModuleType from './types/ModuleType';
declare class ModuleRegistry {
    private readonly requirePath;
    private readonly scanFilter;
    static setScanModule(mt: string, mod: any): void;
    static getScanModule(mt: any): any;
    static setModule(mt: string | ModuleType, mod: any): void;
    static getModule(mt: string | ModuleType): any;
    private static readonly managedModule;
    private static readonly createdModule;
    readonly scanDir: string;
    initialized?: boolean;
    readonly allModules: Map<string | ModuleType, any>;
    constructor(requirePath: string, scanFilter: (path: string) => RegExpMatchArray | null);
    initialize(): void;
    lookup<T>(target: ModuleType): LookupModule;
    lookupByMarker(marker: string | symbol): LookupModule[];
    scan(): void;
    private getMetaDataFrom;
    private postProcess;
    private processDependencyModule;
    private processNonDependencyModule;
}
export default ModuleRegistry;
