import ModuleRegistry from '../ModuleRegistry';
import { Managed } from '../symbols';
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

        Object.defineProperty(target, Managed, {
            value: true
        });

        ModuleRegistry.setMetaInformation(target, info);
    
        return target;
    }
}