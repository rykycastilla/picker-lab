import { Menu, MenuItem } from 'electron'
import { MenuSchema } from '@shared/modules/menu/domain/MenuSchema'
import { MenuService } from '../application/MenuService'
import { toElectronMenu } from './to_electron_menu'

export class ElectronMenu<T extends object = object> implements MenuService {

  private readonly target: Menu

  constructor( ...subMenuList:MenuSchema<T> ) {
    this.target = toElectronMenu( subMenuList )
  }

  public checkEnabled( id:string ): boolean {
    const menuItem: MenuItem | null = this.target.getMenuItemById( id )
    if( menuItem === null ) { return false }
    return menuItem.enabled
  }

  public enable( id:string ) {
    const menuItem: MenuItem | null = this.target.getMenuItemById( id )
    if( menuItem === null ) { return }
    menuItem.enabled = true
  }

  public disable( id:string ) {
    const menuItem: MenuItem | null = this.target.getMenuItemById( id )
    if( menuItem === null ) { return }
    menuItem.enabled = false
  }

  public static getTarget( instance:ElectronMenu ): Menu {
    return instance.target
  }

}
