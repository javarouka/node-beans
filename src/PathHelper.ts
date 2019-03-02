import * as path from 'path';

export default class PathHelper {
    public static getRelaiveDirectory = (dir: string, mod?: NodeModule | null) => {
        if(!mod) {
            return path.resolve(__dirname, dir);
        }

        const parent = mod.parent
        if (!parent) {
            return path.resolve(__dirname, dir);
        }

        const parentFile = parent.filename;
        const parentDir = path.dirname(parentFile);
        return path.resolve(parentDir, dir);
    };
}