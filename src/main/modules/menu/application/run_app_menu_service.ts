import { AppMenuSetter } from './AppMenuSetter'
import { Dependencies } from './Dependencies'
import { EditMenu } from '../application/EditMenu'
import { FileMenu } from '../application/FileMenu'
import { Menu } from '../domain/Menu'
import { MenuItem } from '../domain/MenuItem'
import { MenuService } from './MenuService'
import { Role } from '../domain/Role'
import { StandardMenuItem } from '../domain/StandardMenuItem'
import { ViewMenu } from '../application/ViewMenu'

interface MenuServiceConstructor<T extends MenuService> {
  new ( ...menuList:Array<Menu|MenuItem> ): T
}

export function runAppMenuService<T extends MenuService>(
  MenuService:MenuServiceConstructor<T>, appMenuSetter:AppMenuSetter<T>, dependencies:Dependencies,
): T {
  const menuService = new MenuService(
    new StandardMenuItem( Role.APP_MENU ),
    new FileMenu( dependencies ), new EditMenu(), new ViewMenu(),
    new StandardMenuItem( Role.WINDOW_MENU ),
  )
  appMenuSetter.set( menuService )
  return menuService
}
