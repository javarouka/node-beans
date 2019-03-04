import Module from '../../src/decorators/Module';

@Module({
    marker: 'Http',
    name: 'BController',
    method: 'get',
    path: '/world'
})
export default class BController {
}