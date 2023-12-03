import { GeneralScreensModule } from 'screens/module'
import { NavigationRecords, combineModules } from 'utils/modulesRegistry'
import { MainScreen } from 'MainScreen/module'
import { TasksModule } from 'Tasks/module'
import { ClientProfileModule } from 'ClientProfile/module'
import { ProfileModule } from 'Profile/module'

export const rootModule = combineModules([
  GeneralScreensModule,
  MainScreen,
  TasksModule,
  ClientProfileModule,
  ProfileModule,
])

type SweatcoinRootParamList = NavigationRecords<typeof rootModule.screens>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends SweatcoinRootParamList {}
  }
}
