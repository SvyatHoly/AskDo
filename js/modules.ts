import { GeneralScreensModule } from 'screens/module'
import { NavigationRecords, combineModules } from 'utils/modulesRegistry'
import { MainModule } from 'MainScreen/module'
import { TasksModule } from 'Tasks/module'
import { ClientProfileModule } from 'ClientProfile/module'
import { ProfileModule } from 'Profile/module'
import { LoginModule } from 'Login/module'
import { CreateProfileModule } from 'CreateProfile/module'

export const rootModule = combineModules([
  GeneralScreensModule,
  MainModule,
  TasksModule,
  ClientProfileModule,
  ProfileModule,
  LoginModule,
  CreateProfileModule,
])

type SweatcoinRootParamList = NavigationRecords<typeof rootModule.screens>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends SweatcoinRootParamList {}
  }
}
