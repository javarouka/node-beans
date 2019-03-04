import ModuleRegistry from '../ModuleRegistry';

export default function InjectModule(...profiles: ActiveProfile[]) {
    
    return (target:any) => {
        ModuleRegistry.setProfiles(target, profiles);
        return target;
    }
}