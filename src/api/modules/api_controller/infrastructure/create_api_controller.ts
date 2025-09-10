import { ApiController } from '../application/ApiController'
import { FullScreenRef } from '@/modules/full_screen/application'

export function createApiController( fullScreenRef:FullScreenRef ): ApiController {
  return {
    isFullScreen(): boolean {
      return fullScreenRef.isActive
    },
  }
}
