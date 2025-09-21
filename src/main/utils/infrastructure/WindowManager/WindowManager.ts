import { BrowserWindow } from 'electron'
import { WindowEvent } from './WindowEvent'
import { WindowEventEmitter } from './WindowEventEmitter'
import { WindowLauncher } from './WindowLauncher'
import { WindowStore } from './WindowStore'

export abstract class WindowManager {

  private static readonly emitter = new WindowEventEmitter()
  private static readonly launcher = new WindowLauncher( WindowManager.emitter )
  private static readonly store = new WindowStore()

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
   */
  public static addEventListener( type:'create', handle:( event:WindowEvent ) => Promise<void>|void ) {
    WindowManager.emitter.addEventListener( type, handle )
  }

  /**
   * Removes the event listener in target's event listener list with the same type and callback
   */
  public static removeEventListener( type:'create', handle:( event:WindowEvent ) => Promise<void>|void ) {
    WindowManager.emitter.removeEventListener( type, handle )
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

}
