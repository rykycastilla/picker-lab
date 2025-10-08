import { Color } from './Color'
import { ColorCrudEmitter } from './ColorCrudEmitter'
import { PaletteName } from './PaletteName'

export interface ColorContainer extends ColorCrudEmitter {

  palette: PaletteName

  /**
   * Adds a new `color` to the color container
   * @param color
   * @fires ColorCrudEvent
   */
  add( color:Color ): Promise<void>

  /**
   * List of colors in the color container.
   * While the previous data is loaded the `list` will be an empty array `[]`
   * WARNING: Modifications in this array wouldn't affect the container state
   */
  list: Color[]

}
