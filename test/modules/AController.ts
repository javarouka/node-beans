import Module from '../../src/decorators/Module';
import BController from './BController';

@Module({
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