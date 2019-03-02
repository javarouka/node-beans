import ModuleType from './ModuleType';
export default interface ModuleMetaInformation {
    name: string;
    marker: string | symbol;
    error?: Error;
    primary?: number;
    meta?: any;
    dependencies?: any[];
    module: ModuleType;
}
