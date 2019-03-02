import BController from './BController';
import HttpController from './HttpController';
export default class AController implements HttpController {
    constructor(bController: BController);
    hello(): string;
}
