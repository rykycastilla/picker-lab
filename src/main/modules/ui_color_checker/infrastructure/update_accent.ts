import { BrowserWindow } from 'electron'
import { UI_COLOR_ACCENT_UPDATE } from '@shared/constants'

/**
 * Sends the accent config to the window UI
 */
export function updateAccent( window:BrowserWindow, accent:string|null ) {
  window.webContents.send( UI_COLOR_ACCENT_UPDATE, accent )
}
