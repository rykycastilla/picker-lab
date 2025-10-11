import { MenuItem } from './MenuItem'

/**
 * Menu capable of contain menu items and another submenus
 * @template T  Context
 */
export abstract class Menu<T extends object = object> {

  public readonly id: string | undefined

  /** Item name */
  public abstract readonly label: string

  /** Content of the menu */
  public abstract readonly submenu: Array<MenuItem<T>|Menu<T>>

  /** Represents dependencies */
  protected readonly context: T | undefined

  constructor()
  constructor( id:string )
  constructor( context:T )
  constructor( id:string, context:T )

  constructor( ...args:unknown[] ) {
    const [ first, second ] = args as [
      string | T | undefined,
      T | undefined,
    ]
    if( typeof first === 'string' ) {
      this.id = first
      this.context = second
    }
    else {
      this.context = first
    }
  }

}
