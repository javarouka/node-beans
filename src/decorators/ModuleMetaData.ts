import ModuleType from '../types/ModuleType';

export default interface ModuleMetaData {
    marker?: symbol;
    readonly dependencies?: ModuleType[];
    readonly [props:string]: any;
}