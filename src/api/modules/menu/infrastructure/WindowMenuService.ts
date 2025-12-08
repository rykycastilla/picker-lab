import { MenuCachingService} from '../application/MenuCachingService'
import { MenuItemId } from '@shared/modules/menu/domain'
import { MenuService } from '@shared/modules/menu/application/MenuService'
import { MenuServiceIPCCommunicator } from './MenuServiceIPCCommunicator'

/**
 * Sets the state of the menu items for the specific window.
 * When the window is focused again the previous state of it is recovered
 */
export class WindowMenuService implements MenuService {

  private readonly menuCachingService = new MenuCachingService()
  private readonly ipcCommunicator = new MenuServiceIPCCommunicator()

  constructor() {
    // Executing focus recovering
    window.addEventListener( 'focus', () => this.setFocusRecovering() )
  }

  /**
   * Recovers the state of the menu for this window when the focus is recovered
   */
  private async setFocusRecovering() {
    for( const menuItem of Object.values( MenuItemId ) ) {
      if( typeof menuItem === 'string' ) { continue }
      const isEnabled: boolean = await this.menuCachingService.checkEnabled( menuItem )
      if( isEnabled ) { await this.ipcCommunicator.enable( menuItem ) }
      else { await this.ipcCommunicator.disable( menuItem ) }
    }
  }

  public checkEnabled( item:MenuItemId ): Promise<boolean> {
    return this.ipcCommunicator.checkEnabled( item )
  }

  public async disable( item:MenuItemId ) {
    await this.menuCachingService.disable( item )
    await this.ipcCommunicator.disable( item )
  }

  public async enable( item:MenuItemId ) {
    await this.menuCachingService.enable( item )
    await this.ipcCommunicator.enable( item )
  }

}
