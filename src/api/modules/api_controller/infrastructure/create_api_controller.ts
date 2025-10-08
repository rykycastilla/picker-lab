import { AccentEvent } from '@shared/modules/ui_color_checker/application'
import { AccentService } from '@/modules/ui_color_checker/application'
import { ApiController } from '../application/ApiController'
import { FullScreenRef } from '@/modules/full_screen/application'
import { ISqlite } from '@shared/modules/sqlite/application'

export function createApiController(
  accentService:AccentService, fullScreenRef:FullScreenRef, sqlite:ISqlite,
): ApiController {

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

    sqlite: {

      exec( query:string ): Promise<void> {
        return sqlite.exec( query )
      },

      run( query:string, args?:object ): Promise<void> {
        return sqlite.run( query, args )
      },

      get<T extends object>( query:string, args?:object ): Promise<T|undefined> {
        return sqlite.get<T>( query, args )
      },

      all<T extends object>( query:string, args:object ): Promise<T[]> {
        return sqlite.all<T>( query, args )
      },

    },

  }

}
