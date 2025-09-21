import { BrowserWindow } from 'electron'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { WindowEvent } from './WindowEvent'

export class WindowEventEmitter extends EventDispatcher<CreateWindowListener> {

  public notifyCreation( window:BrowserWindow ) {
    const timeStamp = Date.now()
    this.dispatch( 'create', { window, timeStamp } )
  }

}

interface CreateWindowListener {
  type: 'create'
  handle( event:WindowEvent ): Promise<void> | void
}
