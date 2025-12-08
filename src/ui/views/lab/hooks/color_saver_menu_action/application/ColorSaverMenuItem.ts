import { MenuItemId } from '@shared/modules/menu/domain'
import { MenuService } from '@shared/modules/menu/application'

export class ColorSaverMenuItem {

  constructor(
    private readonly menuService: MenuService,
  ) {}

  public async enable() {
    await this.menuService.enable( MenuItemId.COLOR_SAVER )
  }

  public async disable() {
    await this.menuService.disable( MenuItemId.COLOR_SAVER )
  }

}
