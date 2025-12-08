import { MenuItemId } from '@shared/modules/menu/domain/MenuItemId'

export interface MenuService {
  checkEnabled( item:MenuItemId ): Promise<boolean>
  enable( item:MenuItemId ): Promise<void>
  disable( item:MenuItemId ): Promise<void>
}
