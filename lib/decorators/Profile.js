"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModuleRegistry_1 = __importDefault(require("../ModuleRegistry"));
function InjectModule(...profiles) {
    return (target) => {
        ModuleRegistry_1.default.setProfiles(target, profiles);
        return target;
    };
}
exports.default = InjectModule;
