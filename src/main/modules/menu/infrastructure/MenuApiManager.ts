import { CHECK_MENU_ENABLED, DISABLE_MENU, ENABLE_MENU } from '@shared/modules/menu/constants'
import { MenuEvent, MenuItemArgs, MenuListener } from './MenuEvent'
import { MenuService } from '../application/MenuService'

@MenuListener
export class MenuApiManager {

  constructor(
    private readonly menuService: MenuService,
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

}
