import { BrowserWindow } from 'electron'
import { ColorEvent, uiColorChecker } from '@libs/ui_color_checker'
import { updateAccent } from './update_accent'
import { WindowEvent, WindowManager } from '@/utils/infrastructure/WindowManager'

/**
 * Gets the system accent even if the API is not available (env is not MacOS)
 * @returns Promise with: color code (`string`), invalid, multicolor or not available (`null`)
 */
async function getAccentLoaded(): Promise<string|null> {
  try { return await uiColorChecker.getAccent() }
  catch { return null }
}

/**
 * Handles the color updates to the UI when config changes are detected.
 */
export function runColorCheckerService() {
  // Sending the first value when the window is created (or reloaded)
  WindowManager.addEventListener( 'load', async( event:WindowEvent ) => {
    const accent: string | null = await getAccentLoaded()
    updateAccent( event.window, accent )
  } )
  // Updating when the value changes for all active windows
  uiColorChecker.addEventListener( 'accent', ( event:ColorEvent ) => {
    WindowManager.forEach( ( window:BrowserWindow ) => {
      updateAccent( window, event.value )
    } )
  } )
}
