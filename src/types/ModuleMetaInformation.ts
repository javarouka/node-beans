import ModuleType from './ModuleType';

export default interface ModuleMetaInformation {
    name: string;
    marker: symbol;
    error?: Error;
    primary?: number;
    meta?: any;
    module: ModuleType
}