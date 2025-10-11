import { AppMenuSetter } from '../application/AppMenuSetter'
import { ElectronMenu } from './ElectronMenu'
import { Menu } from 'electron'

export class ElectronAppMenuSetter implements AppMenuSetter<ElectronMenu> {

  public set( menuService:ElectronMenu ) {
    const target: Menu = ElectronMenu.getTarget( menuService )
    Menu.setApplicationMenu( target )
  }

}
