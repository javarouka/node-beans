import ModuleType from '../types/ModuleType';
import ModuleMetaData from './ModuleMetaData';
export default function InjectModule(meta?: ModuleMetaData): (target: ModuleType) => ModuleType;
