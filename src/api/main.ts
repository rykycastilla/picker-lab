import { ApiController } from '@/modules/api_controller/application'
import { AccentIPCDispatcher } from '@/modules/ui_color_checker/infrastructure'
import { AccentService } from '@/modules/ui_color_checker/application'
import { ColorSaverIPCDispatcher } from '@/modules/color/infrastructure'
import { contextBridge } from 'electron'
import { createApiController } from '@/modules/api_controller/infrastructure'
import { FullScreenIPCDispatcher } from '@/modules/full_screen/infrastructure'
import { FullScreenRef } from '@/modules/full_screen/application'
import { SqliteIpcCommunicator } from '@/modules/sqlite/infrastructure'

export async function main() {

  // Setting color saver notifier
  const colorSaverEmitter = new ColorSaverIPCDispatcher()

  // Setting full screen module
  const fullScreenEmitter = new FullScreenIPCDispatcher()
  const fullScreenRef = new FullScreenRef( fullScreenEmitter )

  // Setting UI Color Checker Module
  const accentEmitter = new AccentIPCDispatcher()
  const accentService = new AccentService( accentEmitter )

  // Setting Sqlite module
  const sqlite = new SqliteIpcCommunicator()

  // Setting API controller
  const api: ApiController = createApiController(
    accentService, fullScreenRef, sqlite, colorSaverEmitter,
  )
  contextBridge.exposeInMainWorld( 'api', api )

}

main()
