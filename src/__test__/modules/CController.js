import InjectModule from '../../decorators/InjectModule';

export default InjectModule({
    name: 'PlainModule',
})({
    hello: 'world'
})