"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ModuleRegistry_1 = __importDefault(require("../ModuleRegistry"));
const symbols_1 = require("../symbols");
const ModuleMarker = Symbol('@@Module@@');
function InjectModule(meta = {}) {
    // return target => Reflect.defineMetadata('custom:annotation', path, target)
    return (target) => {
        const { name = '', marker = '', dependencies = [] } = meta;
        ModuleRegistry_1.default.setScanModule(name || target.name, target);
        const info = {
            marker: marker || ModuleMarker,
            dependencies: dependencies || [],
            name: name || target.name,
            meta,
            module: target,
        };
        return Reflect.defineMetadata(symbols_1.Managed, info, target);
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
    };
}
exports.default = InjectModule;
