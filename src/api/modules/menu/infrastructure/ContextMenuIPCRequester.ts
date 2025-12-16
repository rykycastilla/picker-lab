import { CONTEXT_MENU } from '@shared/modules/menu/constants'
import { ContextMenuRequester } from '@shared/modules/menu/application/ContextMenuRequester'
import { ipcRenderer } from 'electron'
import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'

export class ContextMenuIPCRequester implements ContextMenuRequester {

  public invoke( schema:MenuSchemaDTO ): Promise<string|null> {
    return ipcRenderer.invoke( CONTEXT_MENU, { target:schema } )
  }

}
