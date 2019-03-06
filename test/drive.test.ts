import * as path from 'path'
import ModuleRegistry from '../src/index'
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
        mod
    } = registry.lookup<AController>(AController)

    const expected1 = mod instanceof AController ? true : false
    expect(expected1).toBe(true)

    expect(!!mod.config).toBe(true)
    expect(!!mod.bController).toBe(true)
})

test('모듈 스캐너 조건 테스트', () => {

    const {
        mod
    } = registry.lookup<IamNotInjectClass>(IamNotInjectClass)

    const expected1 = mod instanceof IamNotInjectClass ? true : false
    expect(expected1).toBe(false)
})