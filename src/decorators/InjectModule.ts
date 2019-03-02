import Registry from '../ModuleRegistry';
import ModuleMetaInformation from '../types/ModuleMetaInformation';
import ModuleType from '../types/ModuleType';
import ModuleMetaData from './ModuleMetaData';

const NormalModule = Symbol('@@NORMAL@@');

export default function InjectModule(meta: ModuleMetaData = {}) {
    
    return (target:ModuleType) => {

        const info: ModuleMetaInformation = {
            marker: meta.marker || NormalModule,
            dependencies: meta.dependencies || [],
            name: target.name,
            meta,
            module: target,
        };
    
        Registry.setMetaInformation(target, info);
    
        return target;
    }
}