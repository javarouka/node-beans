import ModuleMetaInformation from './types/ModuleMetaInformation';
import ModuleType from './types/ModuleType';
declare class ModuleRegistry {
    static setMetaInformation(mt: ModuleType, info: ModuleMetaInformation): void;
    static getMetaInformation(mt: ModuleType): ModuleMetaInformation | undefined;
    static setModule(mt: ModuleType, mod: any): void;
    static getModule(mt: ModuleType): any;
    static forEachMetaInfo(iter: (meta: ModuleMetaInformation, type: ModuleType, map?: Map<ModuleType, ModuleMetaInformation>) => void): void;
    private static readonly moduleMetaInfo;
    private static readonly createdModule;
}
export default ModuleRegistry;
