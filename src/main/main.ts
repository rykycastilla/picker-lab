import { app } from 'electron'
import { Platform, PlatformService } from '@/utils/Platform'
import { runColorCheckerService } from '@/modules/ui_color_checker/infrastructure'
import { WindowManager } from '@/utils/infrastructure/WindowManager'

async function main() {
  runColorCheckerService()
  await WindowManager.launch()
}

// Keeping alive in MacOS (even closing windows)
app.on( 'window-all-closed', () => {
  if( !PlatformService.checkIs( Platform.MAC ) ) {
    app.quit()
  }
} )

// Open a new window when clicking the dock icon (only in MacOS with active programs)
app.on( 'activate', () => {
  if( WindowManager.activeWindows === 0 ) {
    WindowManager.launch()
  }
} )

// Loading desktop process
const loadingApp = app.whenReady()
loadingApp.then( () => main() )
