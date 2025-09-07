import ElectronWindowState, { State } from 'electron-window-state'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { DEVELOPMENT, DEV_UI_SERVER, PROD_UI_PATH } from '@/constants'

export abstract class WindowManager {

  /**
   * Creates a window that keep its position and size between instances.
   * the values `width`, `height`, `x`, `y` and `fullscreen` will be ignored.
   */
  private static createStatefullWindow( args:BrowserWindowConstructorOptions ): BrowserWindow {
    const windowState: State = ElectronWindowState( {} )
    const { width, height, x, y, isFullScreen:fullscreen } = windowState
    const win = new BrowserWindow( {
      ...args, width, height, x, y, fullscreen,
    } )
    windowState.manage( win )
    return win
  }

  /**
   * Launches a new window
   */
  public static launch() {
    const win: BrowserWindow = this.createStatefullWindow( {
      titleBarStyle: 'hiddenInset',
      vibrancy: 'under-window',
      webPreferences: { contextIsolation:true },
    } )
    if( DEVELOPMENT ) { win.loadURL( DEV_UI_SERVER ) }
    else { win.loadFile( PROD_UI_PATH ) }
  }

  /**
   * Says the amount of active windows
   */
  public static get activeWindows(): number {
    const windowList = BrowserWindow.getAllWindows()
    return windowList.length
  }

}
