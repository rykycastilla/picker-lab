import { MenuItemId } from '@shared/modules/menu/domain/MenuItemId'
import { MenuService } from '@shared/modules/menu/application/MenuService'

/**
 * A caching service to save the latest state of the menu.
 * It has not effect nor implement a real functionality
 */
export class MenuCachingService implements MenuService {

  /**
   * Saved state of the available menu items for the current window
   */
  private readonly cachedMenuStateIndex = new Map<MenuItemId,boolean>()

  public async checkEnabled( item:MenuItemId ): Promise<boolean> {
    return this.cachedMenuStateIndex.get( item ) ?? false
  }

  public async enable( item:MenuItemId ) {
    this.cachedMenuStateIndex.set( item, true )
  }

  public async disable( item:MenuItemId ) {
    this.cachedMenuStateIndex.set( item, false )
  }

}
