import { MenuItem } from './MenuItem'

/**
 * Menu capable of contain menu items and another submenus
 * @template T  Context
 */
export abstract class Menu<T extends object = object> {

  public readonly id: string | undefined

  /** Item name */
  public abstract readonly name: string

  /** Content of the menu */
  public abstract readonly content: Array<MenuItem<T>|Menu<T>>

  /** Represents dependencies */
  protected readonly context: T

  constructor()
  constructor( id:string )
  constructor( context:T )
  constructor( id:string, context:T )

  constructor( ...args:unknown[] ) {
    const [ first, second ] = args as [
      string | T | undefined,
      T | undefined,
    ]
    let context: T | undefined
    if( typeof first === 'string' ) {
      this.id = first
      context = second
    }
    else {
      context = first
    }
    this.context = context ?? {} as T
  }

}
