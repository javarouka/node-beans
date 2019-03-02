export default class ModuleScanner {
    private readonly requirePath;
    constructor(requirePath: string);
    scan(): void;
    postProcess(loadedModules: Readonly<{}>): void;
}
