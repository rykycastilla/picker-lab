import { BrowserWindow } from 'electron'
import { WindowEvent } from './WindowEvent'
import { WindowEventEmitter } from './WindowEventEmitter'
import { WindowLauncher } from './WindowLauncher'
import { WindowListener } from './WindowListener'
import { WindowStore } from './WindowStore'

export abstract class WindowManager {

  private static readonly store = new WindowStore()
  private static readonly emitter = new WindowEventEmitter( WindowManager.store )
  private static readonly launcher = new WindowLauncher( WindowManager.emitter )

  /**
   * Launches a new window
   */
  public static async launch() {
    await WindowManager.launcher.launch()
  }

  /**
   * Appends an event listener for events whose type attribute
   * value is type. The callback argument sets the handler that
   * will be invoked when the event is dispatched.
   * @param type  `load` is dispatched when a window is created or reloaded
   */
  public static addEventListener( type:'load', handle:( event:WindowEvent ) => Promise<void> | void ): void

  /**
   * Appends an event listener for events whose type attribute
   * value is type. The callback argument sets the handler that
   * will be invoked when the event is dispatched.
   * @param type  `window-change` is dispatched when the current window is replaced
   */
  public static addEventListener( type:'window-change', handle:( event:WindowEvent<null> ) => Promise<void> | void ): void

  public static addEventListener<T extends WindowListener>( type:T[ 'type' ], handle:T[ 'handle' ] ) {
    WindowManager.emitter.addEventListener( type, handle as any )
  }

  /**
   * Removes the event listener in target's event listener list with the same type and callback
   */
  public static removeEventListener( type:'load', handle:( event:WindowEvent ) => Promise<void> | void ): void

  /**
   * Removes the event listener in target's event listener list with the same type and callback
   */
  public static removeEventListener( type:'window-change', handle:( event:WindowEvent<null> ) => Promise<void> | void ): void

  public static removeEventListener<T extends WindowListener>( type:T[ 'type' ], handle:T[ 'handle' ] ) {
    WindowManager.emitter.removeEventListener( type, handle as any )
  }

  /**
   * Performs the specified action for each active window.
   */
  public static forEach( callback:( window:BrowserWindow ) => Promise<void>|void ) {
    WindowManager.store.forEach( callback )
  }

  /**
   * Says the amount of active windows
   */
  public static get activeWindows(): number {
    return WindowManager.store.activeWindows
  }

  /**
   * Current focused window
   */
  public static get focusedWindow(): BrowserWindow | null {
    return WindowManager.store.focusedWindow
  }

}
