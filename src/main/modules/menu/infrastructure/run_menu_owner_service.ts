import { MenuItemId } from '@shared/modules/menu/domain/MenuItemId'
import { MenuService } from '../application/MenuService'
import { WindowEvent, WindowManager } from '@/utils/infrastructure/WindowManager'

/**
 * Disables custom menu items if there are not available windows of the app
 * to be associated to them
 */
export function runMenuOwnerService( menuService:MenuService ) {
  WindowManager.addEventListener( 'window-change', async( event:WindowEvent<null> ) => {
    const { window } = event
    if( window !== null ) { return }
    for( const menuItem of Object.values( MenuItemId ) ) {
      if( typeof menuItem !== 'string' ) { continue }
      menuService.disable( menuItem )
    }
  } )
}
