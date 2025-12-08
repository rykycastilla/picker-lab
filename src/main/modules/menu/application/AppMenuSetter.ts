import { MenuService } from '../application/MenuService'

/**
 * @template T  SpecificMenuServiceImpl
 */
export interface AppMenuSetter<T extends MenuService> {

  /**
   * Sets the application menu using the target of the specified `menuService`
   * @param menuService
   */
  set( menuService:T ): void

}
