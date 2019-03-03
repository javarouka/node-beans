import InjectModule from '../../decorators/InjectModule';
import BController from './BController';

@InjectModule({
    dependencies: [ 'PlainModule', BController ],
    name: 'AController',
    marker: 'Http',
    method: 'get',
    path: '/hello'
})
export default class AController {
    constructor(
        public readonly config:{[p:string]:string}, 
        public readonly bController: BController) {
    }

    public hello() {
        return 'hello, I am AController';
    }
}