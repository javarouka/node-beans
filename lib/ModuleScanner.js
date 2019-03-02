"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-console */
const path = __importStar(require("path"));
const ModuleRegistry_1 = __importDefault(require("./ModuleRegistry"));
class ModuleScanner {
    constructor(requirePath) {
        this.requirePath = requirePath;
    }
    scan() {
        const getScanDirectory = (dir) => {
            const parent = module.parent;
            if (!parent) {
                return path.resolve(__dirname, dir);
            }
            const parentFile = parent.filename;
            const parentDir = path.dirname(parentFile);
            return path.resolve(parentDir, dir);
        };
        const scanDir = getScanDirectory(this.requirePath);
        console.debug('controller scan directory # ', scanDir);
        const loadedModules = require('require-dir')(scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter(fullPath) {
                return fullPath.match(/Controller.(ts|js)$/);
            },
            mapValue(commonJSModule) {
                return commonJSModule.default;
            }
        });
        this.postProcess(loadedModules);
    }
    postProcess(loadedModules) {
        console.log(loadedModules);
        ModuleRegistry_1.default.forEachMetaInfo((meta, type) => {
            console.debug(type, meta);
        });
    }
}
exports.default = ModuleScanner;
