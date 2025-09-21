import { BrowserWindow } from 'electron'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { WindowEvent } from './WindowEvent'

export class WindowEventEmitter extends EventDispatcher<CreateWindowListener> {
  public setLoadEventFor( window:BrowserWindow ) {
    window.webContents.addListener( 'did-finish-load', () => {
      const timeStamp = Date.now()
      this.dispatch( 'load', { window, timeStamp } )
    } )
  }
}

interface CreateWindowListener {
  type: 'load'
  handle( event:WindowEvent ): Promise<void> | void
}
