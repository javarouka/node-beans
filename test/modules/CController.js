import InjectModule from '../../src/decorators/InjectModule';

export default InjectModule({
    name: 'PlainModule',
})({
    hello: 'world'
})