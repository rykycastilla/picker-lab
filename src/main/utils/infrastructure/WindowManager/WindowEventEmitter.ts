import { BrowserWindow } from 'electron'
import { CreateWindowDispatcher } from './CreateWindowDispatcher'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { WindowChangeDispatcher } from './WindowChangeDispatcher'
import { WindowEvent } from './WindowEvent'
import { WindowListener } from './WindowListener'
import { WindowStore } from './WindowStore'

export class WindowEventEmitter extends EventDispatcher<WindowListener> {

  private readonly createWindowDispatcher = new CreateWindowDispatcher( ( event:WindowEvent ) => {
    this.dispatch( 'load', event )
  } )

  constructor( windowStore:WindowStore ) {
    super()
    const windowChangeDispatcher = new WindowChangeDispatcher(
      windowStore, ( event:WindowEvent<null> ) => this.dispatch( 'window-change', event ),
    )
    // Starting window changing dispatcher service
    windowChangeDispatcher.setWindowChangeEvent()
  }

  public setLoadEventFor( window:BrowserWindow ) {
    this.createWindowDispatcher.setLoadEventFor( window )
  }

}
