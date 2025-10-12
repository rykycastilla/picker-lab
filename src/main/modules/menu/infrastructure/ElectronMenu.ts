import { Menu as SubMenu } from '../domain/Menu'
import { Menu, MenuItem as ElectronMenuItem, MenuItemConstructorOptions } from 'electron'
import { MenuItem } from '../domain/MenuItem'
import { MenuService } from '../application/MenuService'
import { toElectronMenu } from './to_electron_menu'

export class ElectronMenu<T extends object = object> implements MenuService {

  private readonly target: Menu

  constructor( ...subMenuList:Array<SubMenu<T>|MenuItem<T>> ) {
    const menu: MenuItemConstructorOptions[] = toElectronMenu( subMenuList )
    this.target = Menu.buildFromTemplate( menu )
  }

  public checkEnabled( id:string ): boolean {
    const menuItem: ElectronMenuItem | null = this.target.getMenuItemById( id )
    if( menuItem === null ) { return false }
    return menuItem.enabled
  }

  public enable( id:string ) {
    const menuItem: ElectronMenuItem | null = this.target.getMenuItemById( id )
    if( menuItem === null ) { return }
    menuItem.enabled = true
  }

  public disable( id:string ) {
    const menuItem: ElectronMenuItem | null = this.target.getMenuItemById( id )
    if( menuItem === null ) { return }
    menuItem.enabled = false
  }

  public static getTarget( instance:ElectronMenu ): Menu {
    return instance.target
  }

}
