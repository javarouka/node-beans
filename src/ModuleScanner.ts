/* tslint:disable:no-console */
import * as path from 'path';
import ModuleRegistry from './ModuleRegistry';

export default class ModuleScanner {

    constructor(private readonly requirePath: string){}

    public scan(): void {

        const getScanDirectory = (dir: string) => {
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

        const loeadModule = require('require-dir')(scanDir, {
            extensions: ['.js', '.ts'],
            recurse: true,
            noCache: true,
            filter(fullPath: string) {
                return fullPath.match(/Controller.(ts|js)$/);
            },
            mapValue(commonJSModule: { default: new (...args: any[]) => {} }) {
                return commonJSModule.default;
            }
        });
        
        this.postProcess(loeadModule);
    }

    public postProcess(loeadModule: Readonly<{}>) {
        console.log(loeadModule);
        ModuleRegistry.forEachMetaInfo((meta, type) => {
            console.debug(type, meta);
        });
    }
}