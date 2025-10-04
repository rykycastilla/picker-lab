import { Color } from './Color'
import { ColorCrudEmitter } from './ColorCrudEmitter'

export interface ColorContainer extends ColorCrudEmitter {

  /**
   * Adds a new color to the color container
   */
  add( color:Color ): void

  /**
   * List of colors in the color container.
   * WARNING: Modifications in this array wouldn't affect the container state
   */
  list: Color[]

}
