import 'reflect-metadata';
import ModuleRegistry from '../ModuleRegistry';
import { Managed } from '../symbols';
import ModuleMetaInformation from '../types/ModuleMetaInformation';
import ModuleMetaData from './ModuleMetaData';

const ModuleMarker = Symbol('@@Module@@');

export default function InjectModule(meta: ModuleMetaData = {}) {
    
    // return target => Reflect.defineMetadata('custom:annotation', path, target)

    return (target:any) => {

        const {
            name = '',
            marker = '',
            dependencies = []
        } = meta;

        ModuleRegistry.setScanModule(name || target.name, target);

        const info: ModuleMetaInformation = {
            marker: marker || ModuleMarker,
            dependencies: dependencies || [],
            name: name || target.name,
            meta,
            module: target,
        };

        return Reflect.defineMetadata(Managed, info, target);
        /*
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
        */
    }
}