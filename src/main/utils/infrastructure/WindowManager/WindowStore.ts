import { BrowserWindow } from 'electron'

export class WindowStore {

  /**
   * Performs the specified action for each active window.
   */
  public async forEach( callback:( window:BrowserWindow ) => Promise<void> | void ) {
    const windowList: BrowserWindow[] = BrowserWindow.getAllWindows()
    for( const window of windowList ) {
      await callback( window )
    }
  }

  /**
   * Says the amount of active windows
   */
  public get activeWindows(): number {
    const windowList: BrowserWindow[] = BrowserWindow.getAllWindows()
    return windowList.length
  }

  /**
   * Current focused window
   */
  public get focusedWindow(): BrowserWindow | null {
    return BrowserWindow.getFocusedWindow()
  }

}
