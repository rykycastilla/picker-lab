import { ActionMenuItem } from '@shared/modules/menu/domain/ActionMenuItem'
import { ActionMenuItemDTO } from '@shared/modules/menu/application/ActionMenuItemDTO'
import { IMenuSchemaMapper, RegisterActionFunction } from '../application/IMenuSchemaMapper'
import { Menu } from '@shared/modules/menu/domain/Menu'
import { MenuDTO } from '@shared/modules/menu/application/MenuDTO'
import { MenuItemDTO } from '@shared/modules/menu/application/MenuItemDTO'
import { MenuSchema } from '@shared/modules/menu/domain/MenuSchema'
import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'
import { Separator } from '@shared/modules/menu/domain/Separator'
import { SEPARATOR } from '@shared/modules/menu/constants'

export class MenuSchemaMapper implements IMenuSchemaMapper {

  /**
   * Builds the **Data Transfer Object** based on the provided `menu`
   * @param menu
   * @param registerAction  Called when an action item (button) is detected
   */
  private buildMenuDTO( menu:Menu, registerAction:RegisterActionFunction ): MenuDTO {
    const { name } = menu
    const content: Array<MenuDTO|MenuItemDTO> = []
    for( const item of menu.content ) {
      const itemDTO: MenuItemDTO | MenuDTO | null = this.buildMenuItemDTO( item, registerAction )
      if( itemDTO === null ) { continue }
      content.push( itemDTO )
    }
    return { name, content }
  }

  /**
   * Prepares action menu item **Data Transfer Objects** and delegates its action registration to `registerAction`
   * @param menu
   * @param registerAction  Allows external code to transform the **DTO** and register its non-serializable action for later invocation
   */
  private prepareActionMenuItemDTO( item:ActionMenuItem, registerAction:RegisterActionFunction ): ActionMenuItemDTO {
    const { id, enabled, name, shortcuts } = item
    const select = () => item.onSelect()
    return registerAction( { id, enabled, name, shortcuts }, select )
  }

  /**
   * Builds a generic menu item **Data Transfer Object**
   * @param item
   * @param registerAction  Called if an action item (button) is detected
   */
  private buildMenuItemDTO( item:ItemSchema, registerAction:RegisterActionFunction ): MenuItemDTO | MenuDTO | null {
    let menuItem: MenuItemDTO | MenuDTO
    if( item instanceof Menu ) {
      menuItem = this.buildMenuDTO( item, registerAction )
    }
    else if( item instanceof Separator ) {
      menuItem = { token:SEPARATOR }
    }
    else if( item instanceof ActionMenuItem ) {
      menuItem = this.prepareActionMenuItemDTO( item, registerAction )
    }
    else {
      return null
    }
    return menuItem
  }

  public build( target:MenuSchema, registerAction:RegisterActionFunction ): MenuSchemaDTO {
    const schemaDTO: MenuSchemaDTO = []
    for( const item of target ) {
      const itemDTO: MenuItemDTO | MenuDTO | null = this.buildMenuItemDTO( item, registerAction )
      if( itemDTO === null ) { continue }
      schemaDTO.push( itemDTO )
    }
    return schemaDTO
  }

}

type ItemSchema = MenuSchema extends Array<infer T> ? T : never
