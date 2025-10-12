/**
 * Menu Item capable of perform actions
 * @template T  Context
 */
export abstract class ActionMenuItem<T extends object = object> {

  public readonly id: string | undefined

  /** Item name */
  public abstract readonly name: string

  /** Keyboard shortcuts to activate this item */
  public readonly shortcuts: string[] | undefined

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

  public abstract onSelect(): Promise<void> | void

}
