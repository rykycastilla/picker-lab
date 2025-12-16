import { MenuSchema } from '@shared/modules/menu/domain/MenuSchema'
import { Resolver } from '@/utils/Resolver'

export interface ContextMenuTarget {
  dependencies: SelectableMenuDependencies
  schema: MenuSchema<SelectableMenuDependencies>
}

interface SelectableMenuDependencies {

  /**
   * Auto resolver (`promise`)
   * that should be resolved when a menu item is selected with its id
   */
  selectingMenuItem: Resolver<string|null>

}
