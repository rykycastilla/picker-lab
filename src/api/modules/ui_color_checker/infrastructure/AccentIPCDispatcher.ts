import { AccentEmitter } from '../application/AccentEmitter'
import { AccentEvent } from '@shared/modules/ui_color_checker/application'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { ipcRenderer } from 'electron'
import { UI_COLOR_ACCENT_UPDATE } from '@shared/constants'

export class AccentIPCDispatcher extends EventDispatcher<AccentListener> implements AccentEmitter {

  constructor() {
    super()
    this.setAccentEvent()
  }

  private setAccentEvent() {
    ipcRenderer.on( UI_COLOR_ACCENT_UPDATE, ( _event:unknown, value:string|null ) => {
      this.dispatch( 'accent', { value } )
    } )
  }

}

interface AccentListener {
  type: 'accent'
  handle( event:AccentEvent ): Promise<void> | void
}
