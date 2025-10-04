import { Color } from '../domain/Color'
import { ColorAvailabilityIndex } from './ColorAvailabilityIndex'
import { ColorContainer } from '../domain/ColorContainer'
import { ColorCrudDispatcher } from './ColorCrudDispatcher'
import { ColorCrudEvent } from '../domain/ColorCrudEvent'

export class ColorSet implements ColorContainer {

  private readonly dispatcher = new ColorCrudDispatcher()
  private readonly colorAvailability = new ColorAvailabilityIndex()
  #list: Color[] = []

  public addEventListener( type:'crud', handle:( event:ColorCrudEvent ) => Promise<void> | void ) {
    this.dispatcher.addEventListener( type, handle )
  }

  public removeEventListener( type:'crud', handle:( event:ColorCrudEvent ) => Promise<void> | void ) {
    this.dispatcher.removeEventListener( type, handle )
  }

  /**
   * Adds a new `color` to the color container if it doesn't exist
   * @param color
   */
  public add( color:Color ): void {
    const alreadyExists: boolean = this.colorAvailability.exists( color )
    if( alreadyExists ) { return }
    this.colorAvailability.check( color )
    this.#list.push( color )
    this.dispatcher.notifyColorCrud( this.list )
  }

  get list(): Color[] {
    return [ ...this.#list ]
  }

}
