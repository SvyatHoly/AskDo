import { Store } from 'redux'

const configurators: Configurator[] = []

type Configurator = (store: Store<AskDo.RootState>) => void

/**
 * @deprecated Do not use directly!
 * Use featureModule instead or add your configurator to the root app.ts file
 */
const addConfigurator = (configurator: Configurator) => {
  configurators.push(configurator)
}

const applyConfigurators = (store: Store<AskDo.RootState>) => {
  for (const configurator of configurators) {
    configurator(store)
  }
}

export const configuratorRegistry = {
  addConfigurator,
  applyConfigurators,
}
