import { EditMenu } from '../application/EditMenu'
import { ElectronAppMenuSetter } from './ElectronAppMenuSetter'
import { ElectronMenu } from './ElectronMenu'
import { FileMenu } from '../application/FileMenu'
import { IPCColorSaver } from '@/modules/color/infrastructure'
import { MenuApiManager } from './MenuApiManager'
import { Role } from '../domain/Role'
import { runMenuOwnerService } from './run_menu_owner_service'
import { StandardMenuItem } from '../domain/StandardMenuItem'
import { ViewMenu } from '../application/ViewMenu'

export function runAppMenuService() {
  const colorSaver = new IPCColorSaver()
  const dependencies = { colorSaver }
  const appMenuSetter = new ElectronAppMenuSetter()
  // Building menu
  const menuService = new ElectronMenu(
    new StandardMenuItem( Role.APP_MENU ),
    new FileMenu( dependencies ), new EditMenu(), new ViewMenu(),
    new StandardMenuItem( Role.WINDOW_MENU ),
  )
  // Setting menu
  appMenuSetter.set( menuService )
  runMenuOwnerService( menuService )
  new MenuApiManager( menuService )

}
