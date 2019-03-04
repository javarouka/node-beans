import * as path from 'path'
import ModuleRegistry from '../src/index'
import { Managed } from '../src/symbols'
import AController from './modules/AController'
import IamNotInjectClass from './modules/IamNotInjectClass'

const registry = new ModuleRegistry('./modules', (fullPath: string) => {
    return fullPath.match(/Controller.(ts|js)$/)
})
registry.initialize()

test('기본 기능을 테스트한다', () => {
    const found = registry.allModules
    expect(found.size).toBe(4)
})

test('가져온 모듈에 관리 마킹이 있는지 테스트한다', () => {
    const found = registry.allModules
    found.forEach(val => {
        const exists = val[Managed] || val.constructor[Managed]
        expect(exists).toBe(true)
    })
})

test('ModuleRegistry 자신 자체가 모듈로 관리되는지 확인한다', () => {

    const {
        mod
    } = registry.lookup<ModuleRegistry>(ModuleRegistry)

    const expected1 = mod instanceof ModuleRegistry ? true : false
    expect(expected1).toBe(true)
    expect(mod.initialized).toBe(true)
    expect(mod.scanDir).toBe(path.resolve(__dirname, './modules'))
})

test('모듈 Lookup', () => {

    const {
        mod:mod1
    } = registry.lookup<AController>(AController)

    const expected1 = mod1 instanceof AController ? true : false
    expect(expected1).toBe(true)

    expect(!!mod1.config).toBe(true)
    expect(!!mod1.bController).toBe(true)
})

test('모듈 스캐너 조건 테스트', () => {

    const {
        mod
    } = registry.lookup<IamNotInjectClass>(IamNotInjectClass)

    const expected1 = mod instanceof IamNotInjectClass ? true : false
    expect(expected1).toBe(false)
})

test('일반 객체의 이름별 룩업이 가능한지 테스트', () => {

    const {
        mod:mod2
    } = registry.lookup('PlainModule')

    expect(mod2.hello).toBe('world')
})