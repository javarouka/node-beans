export default interface ModuleMetaData {
    marker?: string | symbol;
    name?: string, 
    readonly dependencies?: any[];
    readonly [props:string]: any;
}