import { AccentEmitter } from './modules/ui_color_checker/application'
import { ISqlite } from '@shared/modules/sqlite/application'

export interface ApiController extends AccentEmitter {

  /**
   * Says if the window is in full screen mode
   */
  isFullScreen(): boolean

  /**
   * Gets the accent color of the MacOS UI
   * @returns color code (`string`), invalid or multicolor (`null`) or not provided yet (`undefined`)
   */
  getUiAccent(): string | null | undefined

  /**
   * Utility to use the SQLite database
   */
  sqlite: ISqlite

}
