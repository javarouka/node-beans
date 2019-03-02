"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
class PathHelper {
}
PathHelper.getRelaiveDirectory = (dir, mod) => {
    if (!mod) {
        return path.resolve(__dirname, dir);
    }
    const parent = mod.parent;
    if (!parent) {
        return path.resolve(__dirname, dir);
    }
    const parentFile = parent.filename;
    const parentDir = path.dirname(parentFile);
    return path.resolve(parentDir, dir);
};
exports.default = PathHelper;
