import { CHECK_MENU_ENABLED, DISABLE_MENU, ENABLE_MENU } from '@shared/modules/menu/constants'
import { ipcRenderer } from 'electron'
import { MenuItemId } from '@shared/modules/menu/domain/MenuItemId'
import { MenuService } from '@shared/modules/menu/application/MenuService'

export class MenuServiceIPCCommunicator implements MenuService {

  public async checkEnabled( item:MenuItemId ): Promise<boolean> {
    const id: string = MenuItemId[ item ]
    return ipcRenderer.invoke( CHECK_MENU_ENABLED, { id } )
  }

  public async enable( item:MenuItemId ) {
    const id: string = MenuItemId[ item ]
    await ipcRenderer.invoke( ENABLE_MENU, { id } )
  }

  public async disable( item:MenuItemId ) {
    const id: string = MenuItemId[ item ]
    await ipcRenderer.invoke( DISABLE_MENU, { id } )
  }

}
