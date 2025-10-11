/**
 * Menu Item capable of perform actions
 * @template T  Context
 */
export abstract class ActionMenuItem<T extends object = object> {

  public readonly id: string | undefined

  /** Item name */
  public abstract readonly label: string

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

  public abstract click(): void

}
