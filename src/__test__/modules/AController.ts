import InjectModule from '../../decorators/InjectModule';
import BController from './BController';

@InjectModule({
    dependencies: [ BController ],
    method: 'get',
    path: '/hello'
})
export default class AController {
    constructor() {
        console.info('A created');
    }
}