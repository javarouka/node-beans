import InjectModule from '../../decorators/InjectModule';
import BController from './BController';
import HttpController from './HttpController';

@InjectModule({
    dependencies: [ BController ],
    marker: 'Http',
    method: 'get',
    path: '/hello'
})
export default class AController implements HttpController {
    constructor(bController: BController) {
        console.info('A created', bController);
    }

    public hello() {
        return 'hello, I am AController';
    }
}