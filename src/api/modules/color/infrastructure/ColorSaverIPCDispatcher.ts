import { COLOR_SAVING_NOTIFICATION } from '@shared/modules/color/constants'
import { EventDispatcher } from '@shared/utils/EventDispatcher'
import { ipcRenderer } from 'electron'
import { ShouldSaveColorListener } from '../application/ShouldSaveColorListener'

export class ColorSaverIPCDispatcher extends EventDispatcher<ShouldSaveColorListener> {

  constructor() {
    super()
    this.setShouldSaveEvent()
  }

  private setShouldSaveEvent() {
    ipcRenderer.addListener( COLOR_SAVING_NOTIFICATION, () => {
      this.dispatch( 'should-save-color', {} )
    } )
  }

}
