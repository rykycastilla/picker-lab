import { AccentService } from '@/modules/ui_color_checker/application'
import { ApiController } from '../application/ApiController'
import { ColorSaverEmitter } from '@/modules/color/application'
import { ContextMenuRequester } from '@shared/modules/menu/application'
import { FullScreenRef } from '@/modules/full_screen/application'
import { ISqlite } from '@shared/modules/sqlite/application'
import { MenuItemId } from '@shared/modules/menu/domain'
import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'
import { MenuService } from '@shared/modules/menu/application'

export function createApiController(
  accentService: AccentService,
  fullScreenRef: FullScreenRef,
  sqlite: ISqlite,
  colorSaverEmitter: ColorSaverEmitter,
  menuService: MenuService,
  contextMenuRequester: ContextMenuRequester,
): ApiController {

  return {

    isFullScreen(): boolean {
      return fullScreenRef.isActive
    },

    getUiAccent(): string | null | undefined {
      return accentService.value
    },

    addEventListener( type:string, handle:any ) {
      if( type === 'accent' ) { accentService.addEventListener( type, handle ) }
      else if( type === 'should-save-color' ) { colorSaverEmitter.addEventListener( type, handle ) }
    },

    removeEventListener( type:string, handle:any ) {
      if( type === 'accent' ) { accentService.removeEventListener( type, handle ) }
      else if( type === 'should-save-color' ) { colorSaverEmitter.removeEventListener( type, handle ) }
    },

    contextMenuRequester: {

      async invoke( schema:MenuSchemaDTO ): Promise<string|null> {
        return contextMenuRequester.invoke( schema )
      },

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

    menuService: {

      checkEnabled( item:MenuItemId ): Promise<boolean> {
        return menuService.checkEnabled( item )
      },

      async enable( item:MenuItemId ) {
        await menuService.enable( item )
      },

      async disable( item:MenuItemId ) {
        await menuService.disable( item )
      },

    },

  }

}
