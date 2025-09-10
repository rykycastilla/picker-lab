import { ApiController } from '@/modules/api_controller/application'
import { contextBridge } from 'electron'
import { createApiController } from '@/modules/api_controller/infrastructure'
import { FullScreenIPCDispatcher } from '@/modules/full_screen/infrastructure'
import { FullScreenRef } from '@/modules/full_screen/application'

export async function main() {

  // Setting full screen module
  const fullScreenEmitter = new FullScreenIPCDispatcher()
  const fullScreenRef = new FullScreenRef( fullScreenEmitter )

  // Setting API controller
  const api: ApiController = createApiController( fullScreenRef )
  contextBridge.exposeInMainWorld( 'api', api )

}

main()
