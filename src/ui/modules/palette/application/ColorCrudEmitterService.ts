import { ColorCrudEvent } from '../domain/ColorCrudEvent'
import { ColorSet } from './ColorSet'
import { PaletteName } from '../domain/PaletteName'
import { ReservedPalette } from '../domain/ReservedPalette'

export class ColorCrudEmitterService {

  constructor(
    private readonly mainSet: ColorSet,
  ) {}

  /**
   * Appends an event listener for crud events in the specified `palette`
   * @param palette  Palette name
   */
  public addCrudListener( palette:PaletteName, handle:( event:ColorCrudEvent ) => Promise<void> | void ) {
    if( palette !== ReservedPalette.MAIN_WORKING_SET ) { return }
    this.mainSet.addEventListener( 'crud', handle )
  }

  /**
   * Removes the event listener in target's event listener list with the same callback
   * in the specified `palette`
   * @param palette  Palette name
   */
  public removeCrudListener( palette:PaletteName, handle:( event:ColorCrudEvent ) => Promise<void> | void ) {
    if( palette !== ReservedPalette.MAIN_WORKING_SET ) { return }
    this.mainSet.removeEventListener( 'crud', handle )
  }

}
