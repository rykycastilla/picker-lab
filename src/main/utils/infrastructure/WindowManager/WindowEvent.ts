import { BrowserWindow } from 'electron'

export interface WindowEvent {
  window: BrowserWindow
  timeStamp: number
}
