import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { FULL_SCREEN_NOTIFICATION } from '@shared/constants'
import { FullScreenEmitter } from '../application/FullScreenEmitter'
import { FullScreenEvent } from '../application/FullScreenEvent'
import { ipcRenderer } from 'electron'

export class FullScreenIPCDispatcher extends EventDispatcher<FullScreenListener> implements FullScreenEmitter {

  constructor() {
    super()
    this.setFullScreenEvent()
  }

  private setFullScreenEvent() {
    ipcRenderer.on( FULL_SCREEN_NOTIFICATION, ( _event:unknown, isActive:boolean ) => {
      this.dispatch( 'full-screen', { isActive } )
    } )
  }

}

interface FullScreenListener {
  type: 'full-screen'
  handle( event:FullScreenEvent ): void
}
