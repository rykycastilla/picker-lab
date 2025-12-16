import { CHECK_MENU_ENABLED, CONTEXT_MENU, DISABLE_MENU, ENABLE_MENU } from '@shared/modules/menu/constants'
import { ContextMenuManager } from '../application/ContextMenuManager'
import { ContextMenuArgs, MenuEvent, MenuItemArgs, MenuListener } from './MenuEvent'
import { MenuMapper } from '../application/MenuMapper'
import { MenuService } from '../application/MenuService'

/**
 * @template T  `Menu`
 */
@MenuListener
export class MenuApiManager<T extends object> {

  constructor(
    private readonly menuService: MenuService,
    private readonly contextMenuManager: ContextMenuManager<T>,
    private readonly MenuMapper: MenuMapper<T>,
  ) {}

  @MenuEvent( CHECK_MENU_ENABLED )
  public async checkEnabled( _event:object, args:MenuItemArgs ): Promise<boolean> {
    const { id } = args
    return this.menuService.checkEnabled( id )
  }

  @MenuEvent( ENABLE_MENU )
  public async enable( _event:object, args:MenuItemArgs ) {
    const { id } = args
    this.menuService.enable( id )
  }

  @MenuEvent( DISABLE_MENU )
  public async disable( _event:object, args:MenuItemArgs ) {
    const { id } = args
    this.menuService.disable( id )
  }

  @MenuEvent( CONTEXT_MENU )
  public contextMenu( _event:object, args:ContextMenuArgs ): Promise<string|null> {
    const { target } = args
    const menu: T = this.MenuMapper.build( target )
    return this.contextMenuManager.show( menu )
  }

}
