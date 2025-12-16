import { ActionMenuItemData } from './IMenuSchemaMapper'
import { ContextMenuRequester } from '@shared/modules/menu/application/ContextMenuRequester'
import { IdGenerator } from '@/modules/id/application'
import { IMenuSchemaMapper } from './IMenuSchemaMapper'
import { MenuSchema} from '@shared/modules/menu/domain/MenuSchema'
import { MenuSchemaDTO } from '@shared/modules/menu/application/MenuSchemaDTO'

export class ContextMenuService {

  constructor(
    private readonly requester: ContextMenuRequester,
    private readonly idGenerator: IdGenerator,
    private readonly mapper: IMenuSchemaMapper,
  ) {}

  /**
   * Shows a context menu
   * @param schema
   * @returns A promise that resolves when the context menu is closed
   */
  public async invoke( schema:MenuSchema ) {
    /** Stores the actions (`functions`) to be performed when the menu is selected, associated to its element id */
    const selectionIndex: Record<string,FunctionVoid> = {}
    // Building the schema **DTO**
    const schemaDTO: MenuSchemaDTO = this.mapper.build( schema, ( item:ActionMenuItemData, select:FunctionVoid ) => {
      const { id, ...restItem } = item
      // Assigning the id if it was not provided
      const validId: string = id ?? this.idGenerator.gen()
      selectionIndex[ validId ] = select  // Saving the selection to be executed when the item is selected by the other process
      return { id:validId, ...restItem }
    } )
    // Showing menu (sending to the target process)
    const selectedItemId: string | null = await this.requester.invoke( schemaDTO )
    if( selectedItemId === null ) { return }  // Aborting if menu was closed before selecting
    // Searching and executing the action associated to the selected item
    const handleSelect: FunctionVoid | undefined = selectionIndex[ selectedItemId ]
    if( handleSelect === undefined ) { return }
    handleSelect()
  }

}

interface FunctionVoid {
  (): void
}
