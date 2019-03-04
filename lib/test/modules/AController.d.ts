import BController from './BController';
export default class AController {
    readonly config: {
        [p: string]: string;
    };
    readonly bController: BController;
    constructor(config: {
        [p: string]: string;
    }, bController: BController);
    hello(): string;
}
