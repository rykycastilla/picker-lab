import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'

/**
 * @template T  `Menu`
*/
export interface MenuMapper<T extends object> {

  /**
   * Builds a valid domain menu based (with its dependencies) on the JS plain object provided
   */
  build( menu:MenuSchemaDTO ): T

}
