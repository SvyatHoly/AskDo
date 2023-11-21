import { ComponentType } from 'react'
import { Store } from 'redux'

import { LazyModule } from 'navigation/lazyScreen'

import { configuratorRegistry } from './configuratorRegistry'
import { GetScreenId, screenRegistry } from './screenRegistry'

type LazyModuleScreen<T> = T extends () => Promise<infer R> ? R[keyof R] : never
type LazyScreenProps<T> = T extends ComponentType<infer Props> ? Props : never
type Configurator = (store: Store<AskDo.RootState>) => unknown

type ScreenConfig = {
  screen: ScreenImporter
  getId?: GetScreenId<any>
}
type Module<Screens extends Record<string, ScreenConfig>> = {
  screens: Screens
  configurators?: Configurator[]
}
type AnyScreens = Record<string, ScreenConfig>
type AnyModule = Module<AnyScreens>

type ExtractScreens<L> = L extends Array<infer M> ? (M extends Module<infer S> ? S : never) : never

export type NavigationRecords<T extends AnyScreens> = {
  [P in keyof T]: LazyScreenProps<LazyModuleScreen<T[P]['screen']>>
}

// https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

export function combineModules<Modules extends AnyModule[]>(modules: Modules) {
  const screens = {} as UnionToIntersection<ExtractScreens<Modules>>
  const configurators: Configurator[] = []

  for (const module of modules) {
    const moduleScreens = module.screens ?? {}
    for (const [screenName, config] of Object.entries(moduleScreens)) {
      // @ts-expect-error entries of Object return generic <strng, any> pairs
      screens[screenName] = config
    }
    const moduleConfigurators = module.configurators ?? []
    for (const configurator of moduleConfigurators) {
      configurators.push(configurator)
    }
  }

  return {
    screens,
    configurators,
  }
}

type AddModule<A extends AnyModule, B extends AnyModule> = Module<A['screens'] & B['screens']>
type ModuleWithoutScreens = {
  screens: {}
  configurators: Configurator[]
}

type ScreenImporter<Props = any> = () => Promise<LazyModule<string, Props>>

type ModuleBuilder<Module extends AnyModule> = {
  addScreen<Name extends string, Props>(
    name: Name,
    component: ScreenImporter<Props>,
    getId?: GetScreenId<LazyScreenProps<LazyModuleScreen<ScreenImporter<Props>>>>
  ): ModuleBuilder<
    AddModule<
      Module,
      {
        screens: {
          [Key in Name]: {
            screen: ScreenImporter<Props>
            getId: GetScreenId<LazyScreenProps<LazyModuleScreen<ScreenImporter<Props>>>>
          }
        }
      }
    >
  >
  addConfigurator(configurator: Configurator): ModuleBuilder<Module>
}

export function featureModule<R extends AnyModule>(
  module: (registry: ModuleBuilder<ModuleWithoutScreens>) => ModuleBuilder<R>
): R {
  const screens: AnyScreens = {}
  const configurators: Configurator[] = []
  const registry: ModuleBuilder<R> = {
    addScreen(name, screen, getId) {
      screens[name] = { screen, getId }

      return this
    },
    addConfigurator(configurator) {
      configurators.push(configurator)

      return this
    },
  }

  module(registry)

  return { screens, configurators } as R
}

export function registerModule<Module extends AnyModule>({ screens, configurators = [] }: Module) {
  if (screens) {
    for (const [name, { screen, getId }] of Object.entries(screens)) {
      // @ts-expect-error entries of Object return generic <strng, any> pairs
      screenRegistry.addScreen(name, screen, getId)
    }
  }
  for (const configurator of configurators) {
    configuratorRegistry.addConfigurator(configurator)
  }
}
