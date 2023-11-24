import { setupListeners } from '@reduxjs/toolkit/query'

import { AppRegistry, Platform, UIManager } from 'react-native'
import { Root } from 'Root'
import { configureActions } from 'configurators/actions'
import { rootModule } from 'modules'

import { configuratorRegistry } from 'utils/configuratorRegistry'
import { registerModule } from 'utils/modulesRegistry'
import { configureAppStore } from 'utils/store'
import moment from 'moment'

registerModule(rootModule)
AppRegistry.registerComponent('AskDo', () => {
  return Root
})

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

// ts-prune-ignore-next
export async function app() {
  const store = await configureAppStore()

  moment.updateLocale('en', {
    week: {
      dow: 1,
    },
  })

  setupListeners(store.dispatch)
  configureActions(store)
  configuratorRegistry.applyConfigurators(store)
}
