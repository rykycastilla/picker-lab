import { ApiController } from '@/modules/api_controller/application'
import { AccentIPCDispatcher } from '@/modules/ui_color_checker/infrastructure'
import { AccentService } from '@/modules/ui_color_checker/application'
import { contextBridge } from 'electron'
import { createApiController } from '@/modules/api_controller/infrastructure'
import { FullScreenIPCDispatcher } from '@/modules/full_screen/infrastructure'
import { FullScreenRef } from '@/modules/full_screen/application'

export async function main() {

  // Setting full screen module
  const fullScreenEmitter = new FullScreenIPCDispatcher()
  const fullScreenRef = new FullScreenRef( fullScreenEmitter )

  // Setting UI Color Checker Module
  const accentEmitter = new AccentIPCDispatcher()
  const accentService = new AccentService( accentEmitter )

  // Setting API controller
  const api: ApiController = createApiController( accentService, fullScreenRef )
  contextBridge.exposeInMainWorld( 'api', api )

}

main()
