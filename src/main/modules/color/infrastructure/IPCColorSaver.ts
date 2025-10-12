import { BrowserWindow } from 'electron'
import { ColorSaver } from '../application/ColorSaver'
import { COLOR_SAVING_NOTIFICATION } from '@shared/modules/color/constants'
import { WindowManager } from '@/utils/infrastructure/WindowManager'

export class IPCColorSaver implements ColorSaver {

  public notify() {
    const currentWindow: BrowserWindow | null = WindowManager.focusedWindow
    if( currentWindow === null ) { return }
    currentWindow.webContents.send( COLOR_SAVING_NOTIFICATION )
  }

}
