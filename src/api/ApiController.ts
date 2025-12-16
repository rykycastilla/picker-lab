import { AccentListener } from './modules/ui_color_checker/application'
import { ContextMenuRequester } from '@shared/modules/menu/application'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { ISqlite } from '@shared/modules/sqlite/application'
import { MenuService } from '@shared/modules/menu/application'
import { PublicOf } from '@shared/types/PublicOf'
import { ShouldSaveColorListener } from './modules/color/application'

export interface ApiController extends SystemEmitter {

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

  /**
   * Utility to handle menu items of the app
   */
  menuService: MenuService

  /**
   * Handle context menus using raw data (**DTO**)
   */
  contextMenuRequester: ContextMenuRequester

}

type SystemEmitter = PublicOf<EventDispatcher<AccentListener|ShouldSaveColorListener>>
