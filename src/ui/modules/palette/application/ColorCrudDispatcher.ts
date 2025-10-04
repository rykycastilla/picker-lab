import { Color } from '../domain/Color'
import { ColorCrudEvent } from '../domain/ColorCrudEvent'
import { ColorCrudEmitter } from '../domain/ColorCrudEmitter'
import { EventDispatcher } from '@shared/utils/EventDispatcher'

export class ColorCrudDispatcher extends EventDispatcher<ColorCrudListener> implements ColorCrudEmitter {

  /**
   * Dispatch a new color crud event
   */
  public notifyColorCrud( list:Color[] ) {
    this.dispatch( 'crud', { list } )
  }

}

interface ColorCrudListener {
  type: 'crud'
  handle( event:ColorCrudEvent ): Promise<void> | void
}
