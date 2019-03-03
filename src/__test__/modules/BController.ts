import InjectModule from '../../decorators/InjectModule';

@InjectModule({
    marker: 'Http',
    name: 'BController',
    method: 'get',
    path: '/world'
})
export default class BController {
}