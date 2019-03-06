import 'reflect-metadata';
import ModuleMetaData from './ModuleMetaData';
export default function InjectModule(meta?: ModuleMetaData): (target: any) => void;
