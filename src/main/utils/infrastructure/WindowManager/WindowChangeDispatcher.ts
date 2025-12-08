import { app, BrowserWindow } from 'electron'
import { WindowEvent } from './WindowEvent'
import { WindowStore } from './WindowStore'

export class WindowChangeDispatcher {

  private latestFocusedWindow: BrowserWindow | null = null

  constructor(
    private readonly windowStore: WindowStore,
    private readonly dispatch: DispatcherFunction,
  ) {}

  /**
   * Updates the current window and dispatches its event if it is necessary
   */
  private checkCurrentWindowChanging() {
    // Detecting current window variations
    const currentWindow: BrowserWindow | null = this.windowStore.focusedWindow
    if( currentWindow === this.latestFocusedWindow ) { return }
    this.latestFocusedWindow = currentWindow
    // Dispatching changing event
    const event = new WindowEvent<null>( currentWindow )
    this.dispatch( event )
  }

  public setWindowChangeEvent() {
    app.on( 'browser-window-focus', () => this.checkCurrentWindowChanging() )
    app.on( 'browser-window-blur', () => this.checkCurrentWindowChanging() )
  }

}

interface DispatcherFunction {
  ( event:WindowEvent<null> ): void
}
