import { Separator } from '@shared/modules/menu/domain/Separator'
import { SEPARATOR } from '@shared/modules/menu/constants'
import { SeparatorDTO } from '@shared/modules/menu/application/SeparatorDTO'
import { ActionMenuItem } from '@shared/modules/menu/domain/ActionMenuItem'
import { ActionMenuItemDTO } from '@shared/modules/menu/application/ActionMenuItemDTO'
import { ContextMenuTarget } from '../application/ContextMenuTarget'
import { Menu } from '@shared/modules/menu/domain/Menu'
import { MenuDTO } from '@shared/modules/menu/application/MenuDTO'
import { MenuItemDTO } from '@shared/modules/menu/application/MenuItemDTO'
import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'
import { MenuMapper } from '../application/MenuMapper'
import { Resolver } from '@/utils/Resolver'

export class MenuSchemaMapper implements MenuMapper<ContextMenuTarget> {

  /**
   * Checks if the menu item (DTO) is a submenu (DTO)
   * @returns `true` if the menu item is a submenu
   */
  private checkIsMenu( itemDTO:MenuDTO|MenuItemDTO ): itemDTO is MenuDTO {
    const { name, content } = itemDTO as { name:unknown, content:unknown }
    return ( typeof name === 'string' ) && ( content instanceof Array )
  }

  /**
   * Checks if the menu item (DTO) is a separator (DTO)
   * @returns `true` if the menu item is a separator
   */
  private checkIsSeparator( itemDTO:MenuItemDTO ): itemDTO is SeparatorDTO {
    const { token } = itemDTO as { token:unknown }
    return token === SEPARATOR
  }

  /**
   * Builds Action buttons of the menu
   */
  private buildActionMenuItem( actionMenuItemDTO:ActionMenuItemDTO, context:MenuDependencies ): MenuItem {
    const { id, enabled, name, shortcuts } = actionMenuItemDTO
    // Declaring action button
    return new class extends ActionMenuItem<MenuDependencies> {
      public readonly id: string = id
      public readonly enabled: boolean | undefined = enabled
      public readonly name: string = name
      public readonly shortcuts: string[] | undefined = shortcuts
      // When the action button is selected, notify its id
      onSelect() {
        const { selectingMenuItem } = this.context
        selectingMenuItem.resolve( this.id )
      }
    }( context )
  }

  /**
   * Builds a menu item based on the basics **Data Transfer Objects**
   */
  private buildItem( itemDTO:MenuDTO|MenuItemDTO, context:MenuDependencies ): MenuItem {
    let menuItem: MenuItem
    // Creating Submenus
    if( this.checkIsMenu( itemDTO ) ) {
      menuItem = this.buildMenu( itemDTO, context )
    }
    // Creating Separators
    else if( this.checkIsSeparator( itemDTO ) ) {
      menuItem = new Separator()
    }
    // Creating Action buttons
    else {
      menuItem = this.buildActionMenuItem( itemDTO, context )
    }
    return menuItem
  }

  /**
   * Creating and building each submenu element
   * @returns `MenuItem`'s collection
   */
  private createSubmenuContent( contentDTO:MenuSchemaDTO, context:MenuDependencies ): MenuItem[] {
    const content = []
    for( const itemDTO of contentDTO ) {
      const menuItem: MenuItem = this.buildItem( itemDTO, context )
      content.push( menuItem )
    }
    return content
  }

  /**
   * Builds the menu item giving its **Data Transfer Object**
   */
  private buildMenu( menu:MenuDTO, context:MenuDependencies ): MenuItem {
    const { name, content } = menu
    // Assigning alias to the main context
    const MenuSchemaMapper = this  // eslint-disable-line
    // Declaring Menu content
    return new class extends Menu<MenuDependencies> {
      // Declaring properties
      public readonly name: string = name
      public readonly content: MenuItem[]
      constructor( context:MenuDependencies ) {
        // Pass the context of dependency (MenuItemResolver) to spread it through the menu
        super( context )
        this.content = MenuSchemaMapper.createSubmenuContent( content, context )
      }
    }( context )
  }

  public build( menu:MenuSchemaDTO ): ContextMenuTarget {
    const selectingMenuItem = new Resolver<string|null>()
    const dependencies: MenuDependencies = { selectingMenuItem }
    const schema: MenuItem[] = []
    // Getting constructor of every parsable object
    for( const itemDTO of menu ) {
      const menuItem: MenuItem = this.buildItem( itemDTO, dependencies )
      schema.push( menuItem )
    }
    // building schema
    return { dependencies, schema }
  }

}

type MenuDependencies = ContextMenuTarget[ 'dependencies' ]
type MenuItem = ContextMenuTarget[ 'schema' ][ number ]
