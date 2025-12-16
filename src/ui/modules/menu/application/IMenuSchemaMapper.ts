import { ActionMenuItemDTO } from '@shared/modules/menu/application/ActionMenuItemDTO'
import { MenuSchema } from '@shared/modules/menu/domain/MenuSchema'
import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'
import { Nullify } from '@shared/types/Nullify'

export interface IMenuSchemaMapper {

  /**
   * Builds a **DTO** of the menu (`target`)
   * @param target
   * @param registerAction  Allows external code to transform the **DTO** and register its non-serializable action for later invocation
   */
  build( target:MenuSchema, registerAction:RegisterActionFunction ): MenuSchemaDTO

}

interface FunctionVoid {
  (): void
}

export interface RegisterActionFunction {
  ( item:ActionMenuItemData, select:FunctionVoid ): ActionMenuItemDTO & { id:string }
}

export type ActionMenuItemData = Nullify<ActionMenuItemDTO,'id'>
