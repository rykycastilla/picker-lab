import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { FocusChangeEvent } from '../application/FocusChangeEvent'
import { FocusEmitter } from '../application/FocusEmitter'

export class WindowFocusDispatcher extends EventDispatcher<FocusChangeListener> implements FocusEmitter {

  private static instance: WindowFocusDispatcher | null = null

  private constructor() {
    super()
    this.setFocusChangeEvent()
  }

  /**
   * Preparing window focus events to be dispatched to the app system
   */
  private setFocusChangeEvent() {
    window.addEventListener( 'focus', () => this.dispatch( 'focus-change', { hasFocus:true } ) )
    window.addEventListener( 'blur', () => this.dispatch( 'focus-change', { hasFocus:false } ) )
  }

  /**
   * Gets the same single instance of the object every time
   */
  public static getInstance(): WindowFocusDispatcher {
    if( WindowFocusDispatcher.instance === null ) {
      WindowFocusDispatcher.instance = new WindowFocusDispatcher()
    }
    return WindowFocusDispatcher.instance
  }

}

interface FocusChangeListener {
  type: 'focus-change'
  handle( event:FocusChangeEvent ): Promise<void> | void
}
