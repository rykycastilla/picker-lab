import { Color } from '../domain/Color'
import { ColorAvailabilityIndex } from './ColorAvailabilityIndex'
import { ColorContainer } from '../domain/ColorContainer'
import { ColorCrudDispatcher } from './ColorCrudDispatcher'
import { ColorCrudEvent } from '../domain/ColorCrudEvent'
import { ColorRepository } from './ColorRepository'
import { ReservedPalette } from '../domain/ReservedPalette'

export class ColorSet implements ColorContainer {

  private readonly dispatcher = new ColorCrudDispatcher()
  private readonly colorAvailability = new ColorAvailabilityIndex()

  private readonly restoringContent: Promise<void>
  public readonly palette = ReservedPalette.MAIN_WORKING_SET

  /**
   * Internal color list. It cannot be modified before `restoreContent` was terminated
   */
  #list: Color[] = []

  constructor(
    private readonly colorRepository: ColorRepository,
  ) { this.restoringContent = this.restoreContent() }

  /**
   * Load the previous saved content for the main working set
   * @fires ColorCrudEvent
   */
  public async restoreContent() {
    const colorList: Color[] = await this.colorRepository.findByPalette( this.palette )
    this.#list = colorList
    this.dispatcher.notifyColorCrud( this.list )
  }

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
  public async add( color:Color ) {
    await this.restoringContent
    // Checking existence
    const alreadyExists: boolean = this.colorAvailability.exists( color )
    if( alreadyExists ) { return }
    this.colorAvailability.check( color )
    // Saving
    await this.colorRepository.create( color, this.palette )
    this.#list.push( color )
    this.dispatcher.notifyColorCrud( this.list )
  }

  get list(): Color[] {
    return [ ...this.#list ]
  }

}
