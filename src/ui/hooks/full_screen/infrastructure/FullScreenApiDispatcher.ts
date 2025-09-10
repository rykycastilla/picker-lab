import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { FullScreenEvent } from '../application/FullScreenEvent'

export class FullScreenApiDispatcher extends EventDispatcher<FullScreenListener> {

  /** Tiem lapse to check the current full screen state (in miliseconds) */
  private static readonly STATE_CHECKING_LAPSE = 1000

  private static instance: FullScreenApiDispatcher | null = null

  private constructor() {
    super()
    this.setFullScreenEvent()
  }

  private setFullScreenEvent() {
    setInterval( () => {
      const isActive: boolean = api.isFullScreen()
      this.dispatch( 'full-screen', { isActive } )
    }, FullScreenApiDispatcher.STATE_CHECKING_LAPSE )
  }

  /**
   * Gets the same single instance of the object every time
   */
  public static getInstance(): FullScreenApiDispatcher {
    if( FullScreenApiDispatcher.instance === null ) {
      FullScreenApiDispatcher.instance = new FullScreenApiDispatcher()
    }
    return FullScreenApiDispatcher.instance
  }

}

interface FullScreenListener {
  type: 'full-screen'
  handle( event:FullScreenEvent ): void
}
