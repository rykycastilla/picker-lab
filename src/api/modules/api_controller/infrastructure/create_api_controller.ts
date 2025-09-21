import { AccentEvent } from '@shared/modules/ui_color_checker/application'
import { AccentService } from '@/modules/ui_color_checker/application'
import { ApiController } from '../application/ApiController'
import { FullScreenRef } from '@/modules/full_screen/application'

export function createApiController( accentService:AccentService, fullScreenRef:FullScreenRef ): ApiController {

  return {

    isFullScreen(): boolean {
      return fullScreenRef.isActive
    },

    getUiAccent(): string | null | undefined {
      return accentService.value
    },

    addEventListener( type:'accent', handle:( event:AccentEvent ) => Promise<void>|void ) {
      accentService.addEventListener( type, handle )
    },

    removeEventListener( type:'accent', handle:( event:AccentEvent ) => Promise<void>|void ) {
      accentService.removeEventListener( type, handle )
    },

  }

}
