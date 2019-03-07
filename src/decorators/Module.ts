import 'reflect-metadata';
import ModuleRegistry from '../ModuleRegistry';
import { Managed } from '../symbols';
import makeClassAnnotation from './makeClassAnnotation';
import ModuleMetaData from './ModuleMetaData';

export default makeClassAnnotation<ModuleMetaData>(Managed, ModuleRegistry.setScanModule.bind(ModuleRegistry));