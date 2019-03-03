import ModuleRegistry from '../src/index'
import { Managed } from '../src/symbols'
import AController from './modules/AController'
import IamNotInjectClass from './modules/IamNotInjectClass'

const registry = new ModuleRegistry('./modules', (fullPath: string) => {
    return fullPath.match(/Controller.(ts|js)$/)
})
registry.initialize()

test('all', () => {

    const found = registry.allModules

    expect(found.size).toBe(3)

    found.forEach(val => {
        const exists = val[Managed] || val.constructor[Managed]
        expect(exists).toBe(true)
    })
})

test('lookup Class', () => {

    const {
        mod:mod1
    } = registry.lookup<AController>(AController)

    const expected1 = mod1 instanceof AController ? true : false
    expect(expected1).toBe(true)

    expect(!!mod1.config).toBe(true)
    expect(!!mod1.bController).toBe(true)
})


test('lookup class not exists', () => {

    const {
        mod
    } = registry.lookup<IamNotInjectClass>(IamNotInjectClass)

    const expected1 = mod instanceof IamNotInjectClass ? true : false
    expect(expected1).toBe(false)
})

test('lookup object', () => {

    const {
        mod:mod2
    } = registry.lookup('PlainModule')

    expect(mod2.hello).toBe('world')
})