import { ActionMenuItem } from '../domain/ActionMenuItem'
import { capitalizeFirst } from '@/utils/capitalize_first'
import { Menu } from '../domain/Menu'
import { MenuItem } from '../domain/MenuItem'
import { MenuItemConstructorOptions as ElectronMenuItem } from 'electron'
import { Role } from '../domain/Role'
import { Separator } from '../domain/Separator'
import { StandardMenuItem } from '../domain/StandardMenuItem'

function resolveElectronRole( role:Role ): string {
  const roleName: string = Role[ role ]
  const roleWords: string[] = roleName.split( '_' )
  for( let i = 0; i < roleWords.length; i++ ) {
    if( i === 0 ) { continue }
    const word: string = roleWords[ i ]!
    roleWords[ i ] = capitalizeFirst( word )
  }
  return roleWords.join( '' )
}

function resolveAccelerator( shortcuts:string[] ): string {
  return shortcuts.join( '+' )
}

function resolveItem( item:MenuItem ): ElectronMenuItem {
  if( item instanceof ActionMenuItem ) {
    const { id, name:label, shortcuts } = item
    const accelerator: string | undefined = shortcuts === undefined
      ? undefined
      : resolveAccelerator( shortcuts )
    return { id, label, accelerator, click() { item.onSelect() } }
  }
  if( item instanceof StandardMenuItem ) {
    const { id, role:roleValue } = item
    const role: string = resolveElectronRole( roleValue )
    return { id, role } as ElectronMenuItem
  }
  if( item instanceof Separator ) {
    return { type:'separator' }
  }
  return {}
}

function resolveMenu( menu:Menu ): ElectronMenuItem {
  const { id, name:label, content } = menu
  const submenu: ElectronMenuItem[] = content.map( resolve )
  return { id, label, submenu }
}

function resolve( item:Menu|MenuItem ): ElectronMenuItem {
  return item instanceof Menu
    ? resolveMenu( item )
    : resolveItem( item )
}

/**
 * Transforms Menu models into a valid Menu template for electron API
 */
export function toElectronMenu( menuItemList:Array<Menu|MenuItem> ): ElectronMenuItem[] {
  return menuItemList.map( resolve )
}
