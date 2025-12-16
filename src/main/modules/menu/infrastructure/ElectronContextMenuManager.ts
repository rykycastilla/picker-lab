import { ContextMenuManager } from '../application/ContextMenuManager'
import { ContextMenuTarget } from '../application/ContextMenuTarget'
import { Menu } from 'electron'
import { toElectronMenu } from './to_electron_menu'

export class ElectronContextMenuManager implements ContextMenuManager<ContextMenuTarget> {

  public show( target:ContextMenuTarget ): Promise<string|null> {
    const { dependencies, schema } = target
    const { selectingMenuItem } = dependencies
    const menu: Menu = toElectronMenu( schema )
    menu.popup( {
      // Indicating the menu was closed without selection
      callback() { selectingMenuItem.resolve( null ) },
    } )
    return selectingMenuItem.promise
  }

}
