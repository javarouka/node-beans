import 'reflect-metadata';
import ModuleMetaData from './ModuleMetaData';

export default function makeClassAnnotation<T extends ModuleMetaData>(
    metadataKey: string|symbol, 
    preProcess?: (name:string, target:any) => void,
    postProcess?: (name:string, target:any) => void,
) {
    
    return function Annotation(meta: T) {

        return (target:any) => {

            const name = meta.name || target.name;

            if(preProcess) {
                preProcess(name, target);
            }

            const info = {
                dependencies: meta.dependencies || [],
                name: name || target.name,
                meta,
                module: target,
            };
    
            const ano = Reflect.defineMetadata(metadataKey, info, target);

            if(postProcess) {
                postProcess(name, target);
            }

            return ano;
        }
    }
}