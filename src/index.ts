/* tslint:disable:no-console */
import * as path from 'path';

export const scan = (requirePath: string) => {

    const getScanDirectory = (dir: string) => {
        const parent = module.parent;
        if (!parent) {
            return path.resolve(__dirname, dir);
        }

        const parentFile = parent.filename;
        const parentDir = path.dirname(parentFile);
        return path.resolve(parentDir, dir);
    };

    const scanDir = getScanDirectory(requirePath);
    console.info('controller scan directory # ', scanDir);

    const modules = require('require-dir')(scanDir, {
        extensions: ['.js', '.ts'],
        recurse: true,
        noCache: true,
        filter(fullPath: string) {
            console.log(fullPath);
            return fullPath.match(/Controller.(ts|js)$/);
        },

        mapValue(commonJSModule: { default: new (...args: any[]) => {} }) {
            return commonJSModule;
        }
    });
    
    console.dir(modules);

    return modules;
};
