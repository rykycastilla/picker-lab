import { DEVELOPMENT } from '@/constants'
import { Menu } from '@shared/modules/menu/domain/Menu'
import { Role } from '@shared/modules/menu/domain/Role'
import { Separator } from '@shared/modules/menu/domain/Separator'
import { StandardMenuItem } from '@shared/modules/menu/domain/StandardMenuItem'

export class ViewMenu extends Menu {

  public readonly name = 'View'

  public readonly content = [
    ... DEVELOPMENT ? [
      new StandardMenuItem( Role.RELOAD ),
      new StandardMenuItem( Role.TOGGLE_DEV_TOOLS ),
      new Separator(),
    ] : [],
    new StandardMenuItem( Role.TOGGLE_FULL_SCREEN ),
  ]

}
