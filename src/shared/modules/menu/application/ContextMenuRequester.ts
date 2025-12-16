import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'

export interface ContextMenuRequester {

  /**
   * Sends the data of the menu `scheme` to another process to be invoked, requesting its invocation
   * @param schema
   * @returns A `Promise` that resolves when the context menu is closed with the id of the selected item or `null` if the selection was aborted
   */
  invoke( schema:MenuSchemaDTO ): Promise<string|null>

}
