import ModuleRegistry from '../ModuleRegistry';
import ModuleMetaInformation from '../types/ModuleMetaInformation';
import ModuleMetaData from './ModuleMetaData';

const NormalModule = Symbol('@@NORMAL@@');

export default function InjectModule(meta: ModuleMetaData = {}) {
    
    return (target:any) => {

        if(ModuleRegistry.exists(target)) {
            return target;
        }

        const {
            name = '',
            marker = '',
            dependencies = []
        } = meta;

        const info: ModuleMetaInformation = {
            marker: marker || NormalModule,
            dependencies: dependencies || [],
            name: name || target.name,
            meta,
            module: target,
        };

        ModuleRegistry.setMetaInformation(target, info);
    
        return target;
    }
}