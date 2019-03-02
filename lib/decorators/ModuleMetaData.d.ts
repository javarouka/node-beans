import ModuleType from '../types/ModuleType';
export default interface ModuleMetaData {
    marker?: string | symbol;
    readonly dependencies?: ModuleType[];
    readonly [props: string]: any;
}
